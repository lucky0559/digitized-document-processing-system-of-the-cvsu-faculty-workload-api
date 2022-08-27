import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailToken } from './entities/email-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, EmailToken])],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
