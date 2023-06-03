import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

import { AppDataSource } from '../../../data-source';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { User } from '../entities/user.entity';
import { config } from '../../../../config';
import { ESignature } from '../entities/e-signature.entity';

const userRepository = AppDataSource.getRepository(User);
const eSignatureRepository = AppDataSource.getRepository(ESignature);

@Injectable()
export class UserService {
  public async hashPassword(password: string) {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  }

  public async sendEmail(email: string, email_token: string) {
    const user = await userRepository.findOneBy({ email });

    const oAuthClient = new google.auth.OAuth2(
      config.email.CLIENT_ID,
      config.email.CLIENT_SECRET,
      config.email.REDIRECT_URI,
    );
    oAuthClient.setCredentials({ refresh_token: config.email.REFRESH_TOKEN });

    const sendMail = async () => {
      try {
        const accessToken = await oAuthClient.getAccessToken();

        const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'luckyangelo.rabosa@cvsu.edu.ph',
            clientId: config.email.CLIENT_ID,
            clientSecret: config.email.CLIENT_SECRET,
            refreshToken: config.email.REFRESH_TOKEN,
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
            <p>${config.client_url}verify/${email_token}</p>
          `,
          html: `
          <h1>Hello ${user.firstName}!</h1>
          <p>Please click the link below to verify your email.</p>
          <p>${config.client_url}verify/${email_token}</p>
          <button><h2><a href="${config.client_url}verify/${email_token}">Verify Email</a></h2></button>
          `,
        };
        const result = await transport.sendMail(mailOption);
        return result;
      } catch (error) {
        return error;
      }
    };

    await sendMail()
      .then((result) => console.log('Email sent', result))
      .catch((error) => console.log(error.message));
  }

  public async getAllUser(): Promise<User[]> {
    return await userRepository.find();
  }

  public async getUser(userId: string): Promise<User> {
    const user = await userRepository.findOneBy({ id: userId });
    return user;
  }

  public async register(user: User): Promise<User> {
    const hashPassword = await this.hashPassword(user.password);
    const email_token = crypto.randomBytes(64).toString('hex');
    user.password = hashPassword;
    user.emailToken = email_token;
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
      await this.sendEmail(user.email, email_token);
      const userData = await userRepository.findOneBy({ email: user.email });
      // await tokenRepository.save({
      //   token: email_token,
      // });
      return userData;
    } catch {
      throw new UnauthorizedException('Response error');
    }
  }

  public async login(username: string, password: string): Promise<User> {
    const user = await userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (await bcrypt.compare(password, user.password)) {
      if (user.verified) {
        return user;
      } else {
        throw new UnauthorizedException('Please verify your email first');
      }
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

  public async verifyEmail(token: string) {
    const user = await userRepository.findOneBy({ emailToken: token });
    if (!user) {
      throw new UnauthorizedException('Not existing');
    }
    user.emailToken = '';
    user.verified = true;
    await userRepository.save(user);
  }

  public async uploadESignature(eSignature: ESignature) {
    const hasESignature = await this.checkESignature(eSignature.userId);
    if (hasESignature) {
      const eSignatureData = await eSignatureRepository.findOneBy({
        userId: eSignature.userId,
      });
      await eSignatureRepository.delete({
        userId: eSignature.userId,
      });
      await eSignatureRepository.save(eSignature);
      return eSignatureData;
    }
    await eSignatureRepository.save(eSignature);
    return false;
  }

  public async checkESignature(userId: string) {
    const eSignature = await eSignatureRepository.findOneBy({
      userId,
    });
    if (eSignature) {
      return true;
    } else return false;
  }

  public async changePassword(
    username: string,
    oldPassword: string,
    password: string,
  ) {
    const user = await userRepository.findOneBy({ username });
    if (await bcrypt.compare(oldPassword, user.password)) {
      const newPassword = await this.hashPassword(password);
      user.password = newPassword;
      user.passwordResetCode = null;
      await userRepository.update(user.id, user);
      return 'Change Password Successfully!';
    } else {
      throw new UnauthorizedException('Invalid Old Password');
    }
  }

  public async changeUserRole(email: string, role: string) {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = role;
    await userRepository.update(user.id, user);
    return 'Role Updated Successfully';
  }

  public async resetPassword(email: string) {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetPasswordCode = crypto.randomBytes(64).toString('hex');

    user.passwordResetCode = resetPasswordCode;
    await userRepository.update(user.id, user);

    const oAuthClient = new google.auth.OAuth2(
      config.email.CLIENT_ID,
      config.email.CLIENT_SECRET,
      config.email.REDIRECT_URI,
    );

    oAuthClient.setCredentials({ refresh_token: config.email.REFRESH_TOKEN });

    const sendMail = async () => {
      try {
        const accessToken = await oAuthClient.getAccessToken();

        const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'luckyangelo.rabosa@cvsu.edu.ph',
            clientId: config.email.CLIENT_ID,
            clientSecret: config.email.CLIENT_SECRET,
            refreshToken: config.email.REFRESH_TOKEN,
            accessToken: accessToken.token,
          },
        });

        const mailOption = {
          from: 'DDPS <ddps.cvsu.edu.ph>',
          to: email,
          subject: 'DDPS Reset Password',
          text: `
            <h1>Hello ${user.firstName}</h1>
            <p>Please click the link below to reset your password.</p>
            <p>${config.client_url}reset-password/${resetPasswordCode}</p>
          `,
          html: `
          <h1>Hello ${user.firstName}!</h1>
          <p>Please click the link below to reset your email.</p>
          <p>${config.client_url}reset-password/${resetPasswordCode}</p>
          <button><h2><a href="${config.client_url}reset-password/${resetPasswordCode}">Reset Password</a></h2></button>
          `,
        };
        const result = await transport.sendMail(mailOption);
        return result;
      } catch (error) {
        return error;
      }
    };

    await sendMail()
      .then((result) => console.log('Email sent', result))
      .catch((error) => console.log(error.message));
  }

  public async findUserByPasswordCode(passwordResetCode: string) {
    const user = await userRepository.findOneBy({ passwordResetCode });

    return user;
  }

  public async resetChangePassword(username: string, password: string) {
    const user = await userRepository.findOneBy({ username });
    const newPassword = await this.hashPassword(password);
    user.password = newPassword;
    user.passwordResetCode = null;
    await userRepository.update(user.id, user);
    return 'Reset Change Password Successfully!';
  }
}
