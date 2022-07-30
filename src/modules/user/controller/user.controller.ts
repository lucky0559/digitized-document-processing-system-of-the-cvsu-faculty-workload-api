import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProfileUpdateDto } from '../dtos/user-update.dto';
import { Profile } from '../entities/profile.entity';
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

  @Patch(':id/update-profile')
  public async updateProfile(
    @Param('id') id: string,
    @Body() profileDto: ProfileUpdateDto,
  ): Promise<Profile> {
    return this.userService.updateProfile(id, profileDto);
  }
}
