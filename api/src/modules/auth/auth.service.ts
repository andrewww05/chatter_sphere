import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { GoogleUser, JwtPayload, JwtPayloadInput } from './models';
import type { TokenType } from './models';
import { User } from '../users/entities';
import { CommonHelper } from 'src/common/helpers';

@Injectable()
export class AuthService {
    private readonly LIFETIME_ACCESS_TOKEN: string;
    private readonly LIFETIME_REFRESH_TOKEN: string;
    private readonly APP_URL: string;

    private readonly cookieConfig: CookieOptions;

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
            domain: this.configService.getOrThrow('app.common.domain'),
            secure: CommonHelper.isProduction(),
            httpOnly: CommonHelper.isProduction(),
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

        const { accessToken, refreshToken } = this.issueTokens({
            id: user.id,
        });

        this.addRefreshTokenToResponse(res, refreshToken);

        return { accessToken };
    }

    public async refresh(req: Request, res: Response) {
        const target: TokenType = 'refresh';

        const cookies = req.cookies as Record<string, string | undefined>;
        const token = cookies[target];

        if (!token) throw new UnauthorizedException('Unauthorized');

        let valid: JwtPayload;
        try {
            valid = this.jwtService.verify<JwtPayload>(token);
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

        if (!valid || !valid.id || valid.tokenType !== 'refresh') {
            throw new UnauthorizedException('Unauthorized');
        }

        const user = await this.usersService.findOneById(valid.id);

        const { accessToken, refreshToken } = this.issueTokens({ id: user.id });

        this.addRefreshTokenToResponse(res, refreshToken);

        return { accessToken };
    }

    public logout(req: Request, res: Response) {
        this.removeRefreshTokenFromResponse(res);

        return { message: 'Success' };
    }
}
