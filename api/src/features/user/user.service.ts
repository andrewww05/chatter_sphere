import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { UserRepository } from './repositories/user.repository';
import { WhereUserInput } from './inputs/where-user.input';

@Injectable()
export class UserService {
  public constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  public async findAll(page: number, perPage: number, fields?: string[], where?: WhereUserInput) {
    const users = await this.userRepository.findAll(page, perPage, fields, where);

    return users;
  }

  public async findOne(id: string, fields: string[], where?: WhereUserInput) {
    const user = await this.userRepository.findOne(id, fields, where);

    return user;
  }

  public update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  public remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
