import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser() {
    return this.userService.getAll();
  }

  @Post()
  async createUser(@Body() userDto: User) {
    return this.userService.create(userDto);
  }
}
