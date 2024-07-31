import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<User> {
    return this.userService.signUp(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserInfo(@Request() { user }: any): Promise<User> {
    return this.userService.getUserInfo(user.id);
  }
}
