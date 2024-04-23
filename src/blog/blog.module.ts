import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { CommentController } from './comment.controller';
import { BlogService } from './blog.service';
import { CommentService } from './comment.service';
import { Blog, BlogSchema } from './entities/blog.entity';
import { Comment, CommentSchema } from './entities/comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [BlogController, CommentController],
  providers: [BlogService, CommentService],
})
export class BlogModule {}
