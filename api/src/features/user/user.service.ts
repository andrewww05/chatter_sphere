import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserInput, UpdateUserInput, WhereUserInput } from './dto';
import { MessageResponse } from 'src/common/entities';

@Injectable()
export class UserService {
    public constructor(private readonly userRepository: UserRepository) {}

    public async create(input: CreateUserInput): Promise<MessageResponse> {
        const existingUser = await this.userRepository.exists([
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

    public async findOne(id: string, fields: string[], where?: WhereUserInput) {
        const user = await this.userRepository.findOne(id, fields, where);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    public update(id: string, updateUserInput: UpdateUserInput) {
        return `This action updates a #${id} user`;
    }

    public remove(id: string) {
        return `This action removes a #${id} user`;
    }
}
