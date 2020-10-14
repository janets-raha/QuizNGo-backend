import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  NotAcceptableException,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "./users.service";
import { RolesGuard } from "src/auth/roles.guards";
import { hasRoles } from "src/auth/roles.decorator";
import * as Mongoose from "mongoose";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // //  pour utilisateur simple et admin
  async addUser(
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("favorites") favorites: [Mongoose.Schema.Types.ObjectId],
    @Body("score") score: Number,
    @Body("role") role: string,
  ) {
    // if (password.length < 6)
    if (!password.match(/^\S{6,}$/))
      // ^^^ password no spaces, min length 6
      // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ password 1x uppercase min, 1x lowercase min, 1x digit min, 1x [#?!@$%^&*-], min length 8
      throw new NotAcceptableException(
        "Le mot de passe doit contenir aumoins 6 caractères sans espace(s).",
      );
    const newUser = await this.usersService.insertUser(
      name,
      email,
      password,
      favorites,
      score,
      role,
    );
    return { new_user: newUser }; // modifié pour register new user par admin
  }

  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("admin") //  pour admin
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("admin/:id") //  pour admin
  getUser(@Param("id") userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("admin/:id") //  pour admin
  async updateUserAdmin(
    @Param("id") userId: string,
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("favorites") favorites: [Mongoose.Schema.Types.ObjectId],
    @Body("score") score: Number,
    @Body("role") role: string,
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

  @Patch(":id") //  pour utilisateur simple
  async updateUser(
    @Param("id") userId: string,
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("favorites") favorites: [Mongoose.Schema.Types.ObjectId],
    @Body("score") score: Number,
    //@Body('role') role: boolean,
  ) {
    const result = await this.usersService.updateUser(
      userId,
      name,
      email,
      password,
      favorites,
      score,
      // role,
    );
    return { message: result };
  }

  @Delete("admin/:id") //  pour admin
  async removeUser(@Param("id") prodId: string) {
    await this.usersService.deleteUser(prodId);
    return null;
  }
}
