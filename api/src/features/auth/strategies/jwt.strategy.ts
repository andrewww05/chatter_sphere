import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/features/users/users.service';

export type JwtPayload = {
    tokenType: 'access' | 'refresh';
    id: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        const extractJwtFromCookie = (req) => {
            let token = null;
            if (req && req.cookies) {
                token = req.cookies['access_token'];
            }
            return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        };

        super({
            ignoreExpiration: false,
            secretOrKey: configService.get('app.jwt.secret'),
            jwtFromRequest: extractJwtFromCookie,
        });
    }

    async validate(payload: JwtPayload) {
        if (payload.tokenType != 'access') throw new UnauthorizedException('Invalid token');

        const user = await this.usersService.findOneById(payload.id);

        if (!user) throw new UnauthorizedException('Please log in to continue');

        return {
            id: payload.id,
        };
    }
}
