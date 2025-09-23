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
import type { Request, Response } from 'express';
import { GoogleAuthGuard, JwtAuthGuard } from './guards';
import { GoogleUser } from './models';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(GoogleAuthGuard)
    @Post('login/google')
    public async login(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const tokens = await this.authService.signInGoogle(
            res,
            req.user as GoogleUser,
        );

        return res.status(HttpStatus.OK).json(tokens);
    }

    @UseGuards(JwtAuthGuard)
    @Post('refresh')
    public async refresh(
        @Req() req,
        @Res({ passthrough: true }) res: Response,
    ) {
        const tokens = await this.authService.issueTokens({ id: req.user.id });

        return res.status(HttpStatus.OK).json(tokens);
    }
}
