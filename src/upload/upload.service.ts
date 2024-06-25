import { Injectable } from '@nestjs/common';
import { STS } from 'ali-oss';

@Injectable()
export class UploadService {
  constructor() {}

  getToken(data: {
    accessKeyId: string;
    accessKeySecret: string;
  }): Promise<any> {
    const { accessKeyId, accessKeySecret } = data;
    let sts = new STS({ accessKeyId, accessKeySecret });

    return sts.assumeRole(
      'acs:ram::1279210754830043:role/oss-control',
      '',
      '3600',
      'sessiontest',
    );
  }
}
