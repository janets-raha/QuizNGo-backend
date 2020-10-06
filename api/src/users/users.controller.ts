import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
    async addUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('favorites') favorites: Mongoose.Schema.Types.ObjectId,
        @Body('score') score: string,
        @Body('role') role: string,
    ) {
        const newUser = await this.userService.createUser(
          name,
          email,
          password,
          favorites,
          score,
          role,
        );
        return { "new user created": newUser };
    }

    @Get()
    async showAllUsers() {
        const allUsers = await this.userService.showAll();
        return allUsers;
    }
}
