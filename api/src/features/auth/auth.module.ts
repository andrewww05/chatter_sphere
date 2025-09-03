import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy, JwtStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [UsersModule, PassportModule],
    controllers: [AuthController],
    providers: [ConfigService, AuthService, GoogleStrategy, JwtService, JwtStrategy],
})
export class AuthModule {}
