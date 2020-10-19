import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @ApiOkResponse({ description: 'User login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
