import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

export const GoogleOAuthProvider: Provider = {
  provide: 'GOOGLE_OAUTH_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new OAuth2Client(configService.getOrThrow('google.oauth.clientId'));
  },
};
