import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Blog } from './blog.entity';

export type CommenDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
  blogId: Blog;

  @Prop()
  parentId?: string;

  @Prop()
  parantName?: string;

  @Prop()
  content: string;

  @Prop()
  authorName: string;

  @Prop()
  authorEmail: string;

  @Prop()
  isOriginal: boolean;

  @Prop()
  createDate: string;

  @Prop()
  createTime: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
