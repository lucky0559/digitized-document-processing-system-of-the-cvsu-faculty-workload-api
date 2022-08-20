import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import * as bcrypt from 'bcryptjs';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

// type LoginDto = {
//   email: string;
//   password: string;
// };
const userRepository = AppDataSource.getRepository(User);

@Injectable()
export class UserService {
  public async hashPassword(password: string) {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  }

  public async getAllUser(): Promise<User[]> {
    return await userRepository.find();
  }

  public async register(user: User): Promise<User> {
    const hashPassword = await this.hashPassword(user.password);
    user.password = hashPassword;
    const isUsernameNotAvailable = await userRepository.findOneBy({
      username: user.username,
    });
    const isEmailNotAvailable = await userRepository.findOneBy({
      email: user.email,
    });
    if (isUsernameNotAvailable) {
      throw new UnauthorizedException('Username already taken');
    }
    if (isEmailNotAvailable) {
      throw new UnauthorizedException('Email already used');
    }
    await userRepository.save(user);
    const userData = await userRepository.findOneBy({ email: user.email });
    return userData;
  }

  public async login(username: string, password: string): Promise<User> {
    const user = await userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException();
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  public async updateProfile(
    id: string,
    profileDto: UserUpdateDto,
  ): Promise<User> {
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException('Cant find user');
    }
    const updatedProfile = { ...user, ...profileDto };
    return await userRepository.save(updatedProfile);
  }

  public async deleteProfile(id: string): Promise<User> {
    const user = await userRepository.findOneBy({ id });
    return await userRepository.remove(user);
  }
}
