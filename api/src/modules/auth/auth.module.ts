import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy, JwtStrategy } from './strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GoogleOAuthProvider } from './providers';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('app.jwt.secret'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [
        ConfigService,
        AuthService,
        JwtStrategy,
        GoogleOAuthProvider,
        GoogleStrategy,
    ],
})
export class AuthModule {}
