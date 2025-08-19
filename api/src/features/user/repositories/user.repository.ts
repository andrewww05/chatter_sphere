import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
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
  
  public async findAll(fields?: string[]): Promise<User[]> {
    const select = fields ? this.getSafeFields(fields!) : undefined;

    return await this.usersRepository.find({
      select,
    });
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
