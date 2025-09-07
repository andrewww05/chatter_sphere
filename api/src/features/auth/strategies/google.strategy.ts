import {
    ForbiddenException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Client } from 'google-auth-library';
import { Strategy } from 'passport-custom';
import { GoogleUser } from '../models';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @Inject('GOOGLE_OAUTH_CLIENT')
        private readonly googleOauthClient: OAuth2Client,
        private readonly configService: ConfigService,
    ) {
        super();
    }

    async validate(req: Request): Promise<GoogleUser> {
        const idToken = (req.headers['authorization'] ?? '').split(' ')[1];

        if (!idToken) throw new ForbiddenException('Token not provided');

        const ticket = await this.googleOauthClient.verifyIdToken({
            idToken,
            audience: this.configService.get('google.oauth.clientId'),
        });

        const payload = ticket.getPayload();

        if (!payload) {
            throw new UnauthorizedException('Invalid Google token');
        }

        return new GoogleUser(
            payload.email as string, 
            payload.name as string,
            payload.picture as string,
            payload.sub as string,
        )
    }
}
