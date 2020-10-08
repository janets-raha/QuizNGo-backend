import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guards';
import { AuthService } from './auth/auth.service';


@Controller()
export class AppController {
//  constructor(private readonly appService: AppService) {}
  constructor(private readonly authService: AuthService) {}

  /*@Get()
  getHello(): string {
    return this.appService.getHello();
  }*/

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
