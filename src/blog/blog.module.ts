import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Visitor, VisitorSchema } from 'src/visitor/entities/visitors.entity';
import { VisitorService } from 'src/visitor/visitor.service';
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
      { name: Visitor.name, schema: VisitorSchema },
    ]),
  ],
  controllers: [BlogController, CommentController],
  providers: [BlogService, CommentService, VisitorService],
})
export class BlogModule {}
