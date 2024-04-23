import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BlogModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/fake_boke'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
