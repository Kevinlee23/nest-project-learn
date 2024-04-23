import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  findOne(id: string) {
    return this.blogModel.findById(id);
  }

  list(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async create(blog: CreateBlogDto): Promise<BlogDocument> {
    const date = new Date();
    const createDate = `${date.getFullYear()}-${date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate()}`;

    const createHour =
      date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
    const createMinit =
      date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    const createSec =
      date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds();
    const createTime = `${createDate} ${createHour}:${createMinit}:${createSec}`;

    const newBlog: BlogDocument = await this.blogModel.create({
      ...blog,
      createDate,
      createTime,
    });
    return newBlog;
  }

  async update(blog: UpdateBlogDto): Promise<boolean> {
    const id: string = blog.id;
    try {
      await this.blogModel.updateOne({ id }, { ...blog });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
