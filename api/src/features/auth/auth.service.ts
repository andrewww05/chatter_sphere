import {
    Injectable
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from './models';
import { User } from '../users/entities';

@Injectable()
export class AuthService {
    private LIFETIME_ACCESS_TOKEN: string;
    private LIFETIME_REFRESH_TOKEN: string;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.LIFETIME_ACCESS_TOKEN = this.configService.getOrThrow('app.jwt.lifetime.access');
        this.LIFETIME_REFRESH_TOKEN = this.configService.getOrThrow('app.jwt.lifetime.refresh');
    }

    private issueTokens(payload) {
        const accessToken = this.jwtService.sign({
            ...payload,
            tokenType: 'access' 
        }, {
            expiresIn: this.LIFETIME_ACCESS_TOKEN,
        });
        const refreshToken = this.jwtService.sign({
            ...payload,
            tokenType: 'refresh'
        }, {
            expiresIn: this.LIFETIME_REFRESH_TOKEN,
        });

        return { accessToken, refreshToken }
    }

    public async signInGoogle(googleUser: GoogleUser) {
        let user: User|null = await this.usersService.findOneByEmail(googleUser.email);

        if (!user) {
            user = await this.usersService.create({
                email: googleUser.email,
                fullname: googleUser.name
            });
        };

        const tokens = await this.issueTokens({ 
            id: user.id
         });
        
        return tokens;
    }
}
