import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { Profile } from '../entities/profile.entity';
import * as bcrypt from 'bcryptjs';
import { ProfileUpdateDto } from '../dtos/user-update.dto';

// type LoginDto = {
//   email: string;
//   password: string;
// };
const profileRepository = AppDataSource.getRepository(Profile);

@Injectable()
export class UserService {
  public async hashPassword(password: string) {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  }

  public async getAllUser(): Promise<Profile[]> {
    return await profileRepository.find();
  }

  public async register(user: Profile): Promise<Profile> {
    const hashPassword = await this.hashPassword(user.password);
    user.password = hashPassword;
    return await profileRepository.save(user);
  }

  public async login(email: string, password: string): Promise<Profile> {
    const user = await profileRepository.findOneBy({ email });
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
    profileDto: ProfileUpdateDto,
  ): Promise<Profile> {
    const user = await profileRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException('Cant find user');
    }
    const updatedProfile = { ...user, ...profileDto };
    return await profileRepository.save(updatedProfile);
  }

  public async deleteProfile(id: string): Promise<Profile> {
    const user = await profileRepository.findOneBy({ id });
    return await profileRepository.remove(user);
  }
}
