import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Visitor {
  @Prop()
  uuid: string;

  @Prop()
  likes: string[];

  @Prop()
  nickname?: string;
}

export const VisitorSchema = SchemaFactory.createForClass(Visitor);
