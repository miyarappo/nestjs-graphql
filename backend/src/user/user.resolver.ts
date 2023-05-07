import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UserService } from './user.service';
import { User as UserModel } from './models/user.model';
import { User } from '@prisma/client';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }
}