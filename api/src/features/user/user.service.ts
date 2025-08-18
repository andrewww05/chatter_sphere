import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  public constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  public async findAll() {
    const users = await this.userRepository.findAll();

    return users;
  }

  public findOne(id: string) {
    return {
      id
    };
  }

  public update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  public remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
