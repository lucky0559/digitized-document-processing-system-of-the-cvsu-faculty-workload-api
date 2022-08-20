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
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
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
}
