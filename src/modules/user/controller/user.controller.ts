import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { ESignature } from '../entities/e-signature.entity';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get(':userId')
  public async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Post('register')
  public async createUser(@Body() user: User): Promise<User> {
    return this.userService.register(user);
  }

  @Get(':username/:password/login')
  public async login(
    @Param('username') username: string,
    @Param('password') password: string,
  ): Promise<User> {
    return this.userService.login(username, password);
  }

  @Patch(':id/update-profile')
  public async updateProfile(
    @Param('id') id: string,
    @Body() profileDto: UserUpdateDto,
  ): Promise<User> {
    return this.userService.updateProfile(id, profileDto);
  }

  @Delete(':id/delete')
  public async deleteProfile(@Param('id') id: string): Promise<User> {
    return this.userService.deleteProfile(id);
  }

  @Get('verify/:token')
  public async verifyEmail(@Param('token') token: string) {
    return this.userService.verifyEmail(token);
  }

  @Post('e-signature')
  public async uploadESignature(@Body() eSignature: ESignature): Promise<any> {
    return this.userService.uploadESignature(eSignature);
  }

  @Get(':userId/check-e-signature')
  public async checkESignature(
    @Param('userId') userId: string,
  ): Promise<boolean> {
    return this.userService.checkESignature(userId);
  }

  @Patch(':username/:oldPassword/:password/change-password')
  public async changePassword(
    @Param('username') username: string,
    @Param('oldPassword') oldPassword: string,
    @Param('password') password: string,
  ): Promise<any> {
    return this.userService.changePassword(username, oldPassword, password);
  }

  @Patch(':email/:role/change-role')
  public async changeUserRole(
    @Param('email') email: string,
    @Param('role') role: string,
  ): Promise<any> {
    return this.userService.changeUserRole(email, role);
  }

  @Post(':email/reset-password')
  public async resetPassword(@Param('email') email: string): Promise<any> {
    return this.userService.resetPassword(email);
  }

  @Get(':passwordResetCode/find-by-passwordResetCode')
  public async findUserByPasswordCode(
    @Param('passwordResetCode') passwordResetCode: string,
  ): Promise<User> {
    return this.userService.findUserByPasswordCode(passwordResetCode);
  }

  @Patch(':username/:password/reset-change-password')
  public async resetChangePassword(
    @Param('username') username: string,
    @Param('password') password: string,
  ): Promise<any> {
    return this.userService.resetChangePassword(username, password);
  }
}
