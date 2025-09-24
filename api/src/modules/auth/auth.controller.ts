import {
    Controller,
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

    @Post('refresh')
    public refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const tokens = this.authService.refresh(req, res);

        return res.status(HttpStatus.OK).json(tokens);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    public logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const tokens = this.authService.logout(req, res);

        return res.status(HttpStatus.OK).json(tokens);
    }
}
