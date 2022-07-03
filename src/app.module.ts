import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      // 'mongodb://ddps:SFKdWREM6Jorvvyk@cluster0.lddsl.mongodb.net/?retryWrites=true&w=majority',
      'mongodb://ddps:SFKdWREM6Jorvvyk@cluster0-shard-00-00.lddsl.mongodb.net:27017,cluster0-shard-00-01.lddsl.mongodb.net:27017,cluster0-shard-00-02.lddsl.mongodb.net:27017/?ssl=true&replicaSet=atlas-vq40wb-shard-0&authSource=admin&retryWrites=true&w=majority',
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
