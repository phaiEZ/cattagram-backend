import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local/local-auth.guards';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@Req() req: any): Promise<any> {
    return this.authService.signIn(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any): Promise<any> {
  //   return req.user;
  // }
}
