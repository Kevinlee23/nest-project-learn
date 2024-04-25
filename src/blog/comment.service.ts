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
    const date = new Date();
    const createDate = `${date.getFullYear()}-${date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate()}`;

    const createHour =
      date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
    const createMinit =
      date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    const createSec =
      date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds();
    const createTime = `${createDate} ${createHour}:${createMinit}:${createSec}`;

    const res: CommenDocument = await this.commentModel.create({
      ...comment,
      createDate,
      createTime,
    });

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
