import { Injectable } from '@nestjs/common';
import { STS } from 'ali-oss';

@Injectable()
export class UploadService {
  constructor() {}

  getToken(data: {
    accessKeyId: string;
    accessKeySecret: string;
    roleKey: string;
  }): Promise<any> {
    const { accessKeyId, accessKeySecret, roleKey } = data;
    let sts = new STS({ accessKeyId, accessKeySecret });

    return sts.assumeRole(roleKey, '', '3600', 'sessiontest');
  }
}
