import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
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
      });

      console.log(user);

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

  async getUserInfo(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }
}
