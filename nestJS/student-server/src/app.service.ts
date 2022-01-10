import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAll(): any {
    return 'this.students';
  }
}
