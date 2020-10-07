import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose'


@Injectable()
export class UsersService {
  
  constructor (
    @InjectModel('User') private readonly userModel: Model< User >
    ) {}

  async insertUser(
        name: string, 
        email: string, 
        password: string, 
        favorites: [],
        score: Number,
        role: string,
        ) {
        const newUser = new this.userModel({
            name, 
            email, 
            password, 
            favorites,
            score,
            role,
        });
        try {
          const result = await newUser.save();
          return result.id;
        } catch (error) {
            throw new NotAcceptableException("Email already used.");
        }

    }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users.map(users => ({
            id: users.id,
            name: users.name, 
            email: users.email, 
            password: users.password, 
            favorites: users.favorites,
            score: users.score,
            role: users.role,
        }));
    }

    async getSingleUser(userId: string) {
      const user = await this.findUser(userId);
      return {
          id: user.id,
          name: user.name, 
          email: user.email, 
          password: user.password, 
          favorites: user.favorites,
          role: user.role,
      };
  }
  
  async updateUser(
      userId?: string,
      name?: string, 
      email?: string, 
      password?: string, 
      favorites?: [],
      role?: string,
  ) {
      const updatedUser = await this.findUser(userId);
      if (name) {
      updatedUser.name = name;
      }
      if (email) {
      updatedUser.email = email;
      }
      if (password) {
      updatedUser.password = password;
      }
      if (favorites) {
      updatedUser.favorites = favorites;
      }
      if (role) {
      updatedUser.role = role;
      }
      updatedUser.save();
  }
  
  async deleteUser(userId: string) {
      const result = await this.userModel.deleteOne({_id: userId}).exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find user.');
      }
  }

  async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
}
    
}
