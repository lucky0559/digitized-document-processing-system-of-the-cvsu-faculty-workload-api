import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  // private readonly users: User[] =

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  getAll() {
    return this.userModel
      .find({})
      .then((user) => {
        return user;
      })
      .catch((error) => console.log(error));
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    const res = await newUser.save();
    console.log(res);
    return res;
  }
}
