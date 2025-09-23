import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UpdateUserInput, WhereUserInput } from './dto';
import { Not } from 'typeorm';
import { RegisterUserDto } from '../auth/dto';
import { User } from './entities';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
    public constructor(private readonly userRepository: UsersRepository) {}

    private async generateRandomNickname(length: number = 10): Promise<string> {
        return new Promise((resolve, reject) => {
            randomBytes(length, (err, buffer) => {
                if (err) {
                    return reject(err);
                }
                resolve(buffer.toString('hex'));
            });
        });
    }

    public async findAll(
        page: number,
        perPage: number,
        fields?: string[],
        where?: WhereUserInput,
    ) {
        const users = await this.userRepository.findAll(
            page,
            perPage,
            fields,
            where,
        );

        return users;
    }

    public async findOneById(
        id: string,
        fields?: string[],
        where?: WhereUserInput,
    ) {
        const user = await this.userRepository.findOne(
            { id, ...where },
            fields,
        );

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    public async findOneByEmail(
        email: string,
        fields?: string[],
        where?: WhereUserInput,
    ) {
        const user = await this.userRepository.findOne(
            { email, ...where },
            fields,
        );

        return user;
    }

    public async create(dto: RegisterUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne([
            { email: dto.email },
        ]);

        if (existingUser?.email === dto.email) {
            throw new BadRequestException(
                'A user with this email address already exists.',
            );
        }

        let publicId: string;
        let publicIdExists = true;

        do {
            publicId = await this.generateRandomNickname();
            publicIdExists = await this.userRepository.exists({ publicId });
        } while (publicIdExists);

        const fullfilled: RegisterUserDto & { publicId: string } = {
            ...dto,
            publicId,
        };

        const user = await this.userRepository.create(fullfilled);

        return user;
    }

    public async update(id: string, input: Omit<UpdateUserInput, 'id'>) {
        const exists = await this.userRepository.findOne({ id });

        if (!exists) {
            throw new NotFoundException('User not found.');
        }

        if (input.publicId) {
            const idIsTaken = await this.userRepository.findOne({
                id: Not(id),
                publicId: input.publicId,
            });

            if (idIsTaken) {
                throw new BadRequestException(
                    'This public id is already taken.',
                );
            }
        }

        const user = await this.userRepository.update(id, input);

        return { message: 'success' };
    }

    public async remove(id: string) {
        const exists = await this.userRepository.exists({ id });

        if (!exists) {
            throw new NotFoundException('User not found.');
        }

        await this.userRepository.remove(id);

        return { message: 'success' };
    }

    public async getProfile(id: string, fields: string[]) {
        const profile = await this.userRepository.getProfile(
            { userId: id },
            fields,
        );

        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        return profile;
    }
}
