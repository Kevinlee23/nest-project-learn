import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from './comment.entity';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop()
  content: string;

  @Prop()
  likeNum?: number;

  @Prop()
  address?: string;

  @Prop([String])
  imageList?: string[];

  @Prop([String])
  musicList?: string[];

  @Prop()
  createDate: string;

  @Prop()
  createTime: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  commentIds: Comment[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
