import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const bcrypt = require('bcrypt');
    const user = await this.usersService.findAuth(username);
    const pwdMatch = await bcrypt.compare(pass, user.password)
    if (user && pwdMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
