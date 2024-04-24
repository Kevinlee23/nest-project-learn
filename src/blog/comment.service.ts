import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './entities/blog.entity';
import { CommenDocument, Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async insert(comment: CreateCommentDto): Promise<boolean> {
    const res: CommenDocument = await this.commentModel.create(comment);

    if (res) {
      await this.blogModel.updateOne(
        { _id: comment.blogId },
        { $push: { commentIds: res._id } },
      );

      return true;
    } else {
      return false;
    }
  }

  async list(blogId: string): Promise<Comment[]> {
    const res: BlogDocument = await this.blogModel
      .findOne({ _id: blogId })
      .populate('commentIds'); // 根据 blog 中留存的 comment ids 查找出 comment list

    return res.commentIds;
  }
}
