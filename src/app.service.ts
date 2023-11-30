import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '[마음연구소]백앤드 코딩 테스트 by 최강탁';
  }
}
