import { Injectable } from '@nestjs/common';
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
        score: string,
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
        const result = await newUser.save();
        return result.id;
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
}
