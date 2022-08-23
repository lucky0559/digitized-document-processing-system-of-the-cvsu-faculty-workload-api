import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

import { AppDataSource } from '../../../data-source';
import * as bcrypt from 'bcryptjs';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { User } from '../entities/user.entity';
import { config } from '../../../../config';

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

  public async sendEmail(email: string) {
    const user = await userRepository.findOneBy({ email });

    const oAuthClient = new google.auth.OAuth2(
      config.CLIENT_ID,
      config.CLIENT_SECRET,
      config.REDIRECT_URI,
    );
    oAuthClient.setCredentials({ refresh_token: config.REFRESH_TOKEN });

    const sendMail = async () => {
      try {
        const accessToken = await oAuthClient.getAccessToken();

        const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'luckyangelo.rabosa@cvsu.edu.ph',
            clientId: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            refreshToken: config.REFRESH_TOKEN,
            accessToken: accessToken.token,
          },
        });

        const mailOption = {
          from: 'DDPS <ddps.cvsu.edu.ph>',
          to: email,
          subject: 'DDPS Verify Your Email',
          text: `
            <h1>Hello ${user.firstName}</h1>
            <p>Please click the link below to verify your email.</p>
            <p>https://youtube.com</p>
          `,
          html: `
          <h1>Hello ${user.firstName}!</h1>
          <p>Please click the link below to verify your email.</p>
          <p>https://youtube.com</p>
          <button><h2><a href="https://facebook.com">Verify Email</a></h2></button>
          `,
        };
        const result = await transport.sendMail(mailOption);
        return result;
      } catch (error) {
        return error;
      }
    };

    sendMail()
      .then((result) => console.log('Email sent', result))
      .catch((error) => console.log(error.message));
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
    try {
      await userRepository.save(user);
      await this.sendEmail(user.email);
      const userData = await userRepository.findOneBy({ email: user.email });
      return userData;
    } catch {
      throw new UnauthorizedException('Response error');
    }
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
