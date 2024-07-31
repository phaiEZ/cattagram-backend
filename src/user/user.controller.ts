import {
  Body,
  Controller,
  Get,
  Patch,
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
import { ChangePasswordDto } from './dto/change-password.dtp';

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

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(
    @Request() { user }: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.userService.changePassword(user.id, changePasswordDto);
  }
}
