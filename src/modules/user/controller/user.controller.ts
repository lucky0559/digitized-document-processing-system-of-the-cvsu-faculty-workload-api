import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUser(): Promise<Profile[]> {
    return this.userService.getAllUser();
  }

  @Post('register')
  public async createUser(@Body() user: Profile): Promise<Profile> {
    return this.userService.register(user);
  }

  @Get(':email/:password/login')
  public async login(
    @Param('email') email: string,
    @Param('password') password: string,
  ): Promise<Profile> {
    return this.userService.login(email, password);
  }
}
