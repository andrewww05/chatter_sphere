import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { GoogleUser, JwtPayload, JwtPayloadInput } from './models';
import type { TokenType } from './models';
import { User } from '../users/entities';

@Injectable()
export class AuthService {
    private LIFETIME_ACCESS_TOKEN: string;
    private LIFETIME_REFRESH_TOKEN: string;
    private APP_URL: string;

    private cookieConfig: CookieOptions;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.LIFETIME_ACCESS_TOKEN = this.configService.getOrThrow(
            'app.jwt.lifetime.access',
        );
        this.LIFETIME_REFRESH_TOKEN = this.configService.getOrThrow(
            'app.jwt.lifetime.refresh',
        );
        this.APP_URL = this.configService.getOrThrow('app.common.url');
        this.cookieConfig = {
            domain: this.APP_URL,
            // secure: true,
            // httpOnly: true,
        };
    }

    private addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date();
        expiresIn.setTime(
            expiresIn.getTime() + parseInt(this.LIFETIME_REFRESH_TOKEN),
        );

        const target: TokenType = 'refresh';

        res.cookie(target, refreshToken, {
            ...this.cookieConfig,
            expires: expiresIn,
        });
    }

    private removeRefreshTokenFromResponse(res: Response) {
        const target: TokenType = 'refresh';

        res.cookie(target, {
            ...this.cookieConfig,
            expires: new Date(0),
        });
    }

    public issueTokens(payload: JwtPayloadInput) {
        const accessToken = this.jwtService.sign(
            {
                ...payload,
                tokenType: 'access',
            } as JwtPayload,
            {
                expiresIn: this.LIFETIME_ACCESS_TOKEN,
            },
        );
        const refreshToken = this.jwtService.sign(
            {
                ...payload,
                tokenType: 'refresh',
            } as JwtPayload,
            {
                expiresIn: this.LIFETIME_REFRESH_TOKEN,
            },
        );

        return { accessToken, refreshToken };
    }

    public async signInGoogle(res: Response, googleUser: GoogleUser) {
        let user: User | null = await this.usersService.findOneByEmail(
            googleUser.email,
        );

        if (!user) {
            user = await this.usersService.create({
                email: googleUser.email,
                fullname: googleUser.name,
            });
        }

        const tokens = await this.issueTokens({
            id: user.id,
        });

        this.addRefreshTokenToResponse(res, tokens.refreshToken);

        return tokens;
    }
}
