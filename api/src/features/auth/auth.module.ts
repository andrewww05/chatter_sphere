import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [ConfigService, AuthService, GoogleStrategy],
})
export class AuthModule {}
