import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserInput, UpdateUserInput, WhereUserInput } from './dto';
import { MessageResponse } from 'src/common/entities';
import { Not } from 'typeorm';

@Injectable()
export class UsersService {
    public constructor(private readonly userRepository: UsersRepository) {}

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

    public async findOneById(id: string, fields: string[], where?: WhereUserInput) {
        const user = await this.userRepository.findOne({ id, ...where}, fields);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    public async findOneByEmail(email: string, fields?: string[], where?: WhereUserInput) {
        const user = await this.userRepository.findOne({ id: email, ...where}, fields);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    public async create(input: CreateUserInput): Promise<MessageResponse> {
        const existingUser = await this.userRepository.findOne([
            { email: input.email },
            { publicId: input.publicId },
        ]);

        if (existingUser?.email === input.email) {
            throw new BadRequestException(
                'A user with this email address already exists.',
            );
        }

        if (existingUser?.publicId === input.publicId) {
            throw new BadRequestException(
                'A user with this public id already exists.',
            );
        }

        const user = await this.userRepository.create(input);

        return { message: "success" };
    }

    public async update(id: string, input: Omit<UpdateUserInput, "id">) {
        const exists = await this.userRepository.findOne({ id });

        if (!exists) {
            throw new NotFoundException("User not found.");
        }

        if (input.publicId) {
            const idIsTaken = await this.userRepository.findOne({ id: Not(id), publicId: input.publicId });
        
            if (idIsTaken) {
                throw new BadRequestException("This public id is already taken.");
            }
        }

        const user = await this.userRepository.update(id, input);

        return { message: "success" };
    }

    public async remove(id: string) {
        const exists = await this.userRepository.exists({ id });

        if (!exists) {
            throw new NotFoundException("User not found.");
        }

        await this.userRepository.remove(id);

        return { message: "success" };
    }

    public async getProfile(id: string, fields: string[]) {
        const profile = await this.userRepository.getProfile({ userId: id }, fields);

        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        return profile;
    }
}
