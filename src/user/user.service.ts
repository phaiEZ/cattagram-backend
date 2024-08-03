import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { ChangePasswordDto } from './dto/change-password.dtp';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    try {
      const {
        username,
        password,
        catName,
        ownerName,
        gender,
        breeds,
        description,
        profilePic,
        birthPlace,
      } = signUpDto;

      const hashedPassword = await bcrypt.hashSync(password, 10);

      const user = await this.userRepository.create({
        username,
        password: hashedPassword,
        catName,
        ownerName,
        gender,
        breeds,
        description,
        profilePic,
        birthPlace,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException({
        message: ['Username already exists.'],
      });
    }
  }

  async findOneUser(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ username });

    return user;
  }

  async getUserInfo(id: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    try {
      const { oldPassword, newPassword } = changePasswordDto;
      const user = await this.getUserInfo(id);
      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        user.password,
      );
      if (!isOldPasswordValid) {
        throw new UnauthorizedException('Old password is incorrect');
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await this.userRepository.save(user);
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new ConflictException({
        message: ['error password not change.'],
      });
    }
  }

  async updateUserInfo(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.getUserInfo(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    const { password, ...result } = user;
    return result;
  }
}
