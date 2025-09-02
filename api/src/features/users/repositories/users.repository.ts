import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { OrmHelper } from 'src/common/helpers';
import { BaseRepository } from 'src/common/interfaces';
import { CreateUserInput, UpdateUserInput } from '../dto';
import { UserRole } from 'src/common/enums';
import { UserProfile } from '../entities/user-profile.entity';

@Injectable()
export class UsersRepository implements BaseRepository<User> {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(UserProfile)
        private usersProfileRepository: Repository<UserProfile>,
    ) {}

    public async exists(where: FindOptionsWhere<User>|FindOptionsWhere<User>[]): Promise<boolean> {
        return this.usersRepository.exists({
            where
        })
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
        where?: FindOptionsWhere<User>|FindOptionsWhere<User>[],
        fields?: string[],
    ): Promise<User | null> {
        const select = fields
            ? OrmHelper.getSafeFields(fields!, new User())
            : undefined;

        return this.usersRepository.findOne({
            where,
            select,
        });
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

    public async update(id: string, input: Omit<UpdateUserInput, "id">) {
        return this.usersRepository.update({ id }, {
            publicId: input.publicId,
            profile: {
                fullname: input.fullname,
                biography: input.biography,
                birthDate: input.birthDate,
            }
        });
    }

    public async remove(id: string) {
        return await this.usersRepository.delete(id);
    }

    public async getProfile(
        where?: FindOptionsWhere<UserProfile>|FindOptionsWhere<UserProfile>[],
        fields?: string[],
    ): Promise<UserProfile | null> {
        const select = fields
            ? OrmHelper.getSafeFields(fields!, new UserProfile()): undefined;

        const profile = await this.usersProfileRepository.findOne({
            where,
            select: [...(select ?? []), 'userId'],
        });

        return profile;
    }
}
