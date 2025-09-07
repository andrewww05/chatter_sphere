import {
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { GoogleAuthGuard } from './guards';
import { GoogleUser } from './models';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    private generateJwt(payload) {
        return this.jwtService.sign(payload);
    }

    @UseGuards(GoogleAuthGuard)
    @Post('login/google')
    public async login(@Req() req, @Res() res: Response) {
        const tokens = await this.authService.signInGoogle(req.user as GoogleUser);

        return res.status(HttpStatus.OK).json(tokens);
    }
}
