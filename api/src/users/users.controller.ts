import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post() // //  pour utilisateur simple et admin
    async addUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('favorites') favorites: [],
        @Body('score') score: Number,
        @Body('role') role: string,
    ) {
        const newUser = await this.usersService.insertUser(
          name,
          email,
          password,
          favorites,
          score,
          role,
        );
        return { "new user created": newUser };
    }


    @Get('admin')   //  pour admin
    async getAllUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }

    @Get('admin/:id')   //  pour admin
    getUser(@Param('id') userId: string) {
        return this.usersService.getSingleUser(userId);
    }

    @Patch('admin:id')   //  pour admin
    async updateUserAdmin(
        @Param('id') userId: string,
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('favorites') favorites: [],
        @Body('score') score: Number,
        @Body('role') role: string,
    ) {
        await this.usersService.updateUserAdmin(
            userId,
            name,
            email,
            password,
            favorites,
            score,
            role,
            );
        return null;
    }

    @Patch('admin:id')   //  pour utilisateur simple
    async updateUser(
        @Param('id') userId: string,
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('favorites') favorites: [],
        //@Body('score') score: Number,
        //@Body('role') role: boolean,
    ) {
        await this.usersService.updateUser(
            userId,
            name,
            email,
            password,
            favorites,
           // score,
           // role,
            );
        return null;
    }

    @Delete('admin/:id')   //  pour admin
    async removeUser(@Param('id') prodId: string) {
        await this.usersService.deleteUser(prodId);
        return null;
    }
}
