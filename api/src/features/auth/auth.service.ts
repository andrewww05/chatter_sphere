import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    public async validateUser(id: string, oauth2: string): Promise<any> {
        return null;
    }
}
