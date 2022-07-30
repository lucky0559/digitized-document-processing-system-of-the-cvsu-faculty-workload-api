import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfileRepository } from './repositories/profile.repository';
import { Connection, DataSource } from 'typeorm';
import { TypeOrmExModule } from '../../database/typeorm-ex.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
