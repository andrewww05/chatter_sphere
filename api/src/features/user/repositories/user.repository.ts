import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    private allowedFields: string[] = Object.keys(new User());

    private getSafeFields(fields: string[]): (keyof User)[] {
        return fields.filter((f): f is keyof User =>
            this.allowedFields.includes(f as keyof User),
        );
    }

    public async findAll(
        page: number = 1,
        perPage: number = 10,
        fields?: string[],
        where?: FindOptionsWhere<User>,
    ): Promise<User[]> {
        const offset = (page - 1) * perPage;
        const select = fields ? this.getSafeFields(fields!) : undefined;

        return await this.usersRepository.find({
            select,
            take: perPage,
            skip: offset,
            where,
        });
    }

    findOne(id: string, fields?: string[], where?: FindOptionsWhere<User>): Promise<User | null> {
        const select = fields ? this.getSafeFields(fields!) : undefined;

        return this.usersRepository.findOne({
            where: { ...where, id },
            select,
        });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
