import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { UsersService } from 'src/features/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @Inject(ConfigService) private configService: ConfigService,
        @Inject(UsersService) private usersService: UsersService
    ) {
        super({
            clientID: configService.get('google.oauth.clientId'),
            clientSecret: configService.get('google.oauth.clientSecret'),
            callbackURL: configService.get('google.oauth.callbackUrl'),
            scope: ['profile', 'email'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { id, name, emails, photos } = profile;

        const googleUser = {
            provider: 'google',
            providerId: id,
            email: emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            picture: photos[0].value,
        };

        const user = await this.usersService.findOneByEmail(googleUser.email);

        if (!user) {
            return done(new Error('User not found'), false);
        }

        done(null, user);
    }
}
