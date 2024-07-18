import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Visitor {
  @Prop()
  uuid: string;

  @Prop()
  likes: string[];
}

export const VisitorSchema = SchemaFactory.createForClass(Visitor);
