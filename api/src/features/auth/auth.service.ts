import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    private generateJwt(payload) {
        return this.jwtService.sign(payload);
    }

    public async registerUser(dto: RegisterUserDto) {
        try {
            const user = await this.usersService.create(dto);

            return this.generateJwt({
                sub: user.id,
                email: user.email,
            });
        } catch {
            throw new InternalServerErrorException();
        }
    }

    public async signIn(user) {
        if (!user) {
            throw new BadRequestException('Unauthenticated');
        }

        const userExists = await this.usersService.findOneByEmail(user.email);

        if (!userExists) {
            return this.registerUser(user);
        }

        return this.generateJwt({
            sub: userExists.id,
            email: userExists.email,
        });
    }
}
