import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { OrmHelper } from 'src/common/helpers';
import { BaseRepository } from 'src/common/interfaces';
import { CreateUserInput } from '../dto';
import { UserRole } from 'src/common/enums';

@Injectable()
export class UserRepository implements BaseRepository<User> {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    public async exists(where: FindOptionsWhere<User>|FindOptionsWhere<User>[]): Promise<User|null> {
        return this.usersRepository.findOne({
            where
        })
    }

    public async create(input: CreateUserInput): Promise<User> {
        return this.usersRepository.save({
            email: input.email,
            publicId: input.publicId,
            role: UserRole.USER,
            profile: {
                birthDate: new Date(input.birthDate),
                fullname: input.fullname,
            },
        });
    }

    public async findAll(
        page: number = 1,
        perPage: number = 10,
        fields?: string[],
        where?: FindOptionsWhere<User>,
    ): Promise<User[]> {
        const offset = (page - 1) * perPage;
        const select = fields
            ? OrmHelper.getSafeFields(fields!, new User())
            : undefined;

        return await this.usersRepository.find({
            select,
            take: perPage,
            skip: offset,
            where,
        });
    }

    public async findOne(
        id: string,
        fields?: string[],
        where?: FindOptionsWhere<User>,
    ): Promise<User | null> {
        const select = fields
            ? OrmHelper.getSafeFields(fields!, new User())
            : undefined;

        return this.usersRepository.findOne({
            where: { ...where, id },
            select,
        });
    }

    public async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
