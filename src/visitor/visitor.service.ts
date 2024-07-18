import { Injectable } from '@nestjs/common';
import { Visitor } from './entities/visitors.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VisitorService {
  constructor(
    @InjectModel(Visitor.name) private visitorModel: Model<Visitor>,
  ) {}

  async findVisitor(uuid) {
    const res = await this.visitorModel.findOne({ uuid: uuid }).exec();

    return res;
  }

  async createVisitor(uuid) {
    const res = await this.visitorModel.create({ uuid: uuid, likes: [] });

    return res;
  }

  // 访客id, blog id, 更新操作(add, cancel)
  async updateLikes(uuid, blogId, cal) {
    if (cal === 'add') {
      await this.visitorModel
        .updateOne({ uuid }, { $push: { likes: blogId } })
        .exec();
    } else {
      await this.visitorModel
        .updateOne({ uuid }, { $pull: { likes: blogId } })
        .exec();
    }
  }
}
