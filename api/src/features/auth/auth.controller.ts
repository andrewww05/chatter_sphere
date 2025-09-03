import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleOauthGuard } from './guards';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    private readonly COOKIE_MAXAGE_HOURS = 2;

    private generateJwt(payload) {
        return this.jwtService.sign(payload);
    }

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    public async auth() {
        return 'ok';
    }

    @Get('google/callback')
    public async googleAuthCallback(@Req() req, @Res() res: Response) {
        const token = await this.authService.signIn(req.user);

        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * this.COOKIE_MAXAGE_HOURS,
            sameSite: true,
            secure: false,
        });

        return res.status(HttpStatus.OK);
    }
}
