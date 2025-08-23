import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { OrmHelper } from 'src/common/helpers';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    public async findAll(
        page: number = 1,
        perPage: number = 10,
        fields?: string[],
        where?: FindOptionsWhere<User>,
    ): Promise<User[]> {
        const offset = (page - 1) * perPage;
        const select = fields ? OrmHelper.getSafeFields(fields!, new User()) : undefined;

        return await this.usersRepository.find({
            select,
            take: perPage,
            skip: offset,
            where,
        });
    }

    public async findOne(id: string, fields?: string[], where?: FindOptionsWhere<User>): Promise<User | null> {
        const select = fields ? OrmHelper.getSafeFields(fields!, new User()) : undefined;

        return this.usersRepository.findOne({
            where: { ...where, id },
            select,
        });
    }

    public async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
