import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      console.log('JwtAuthGuard error: ', { err, user, info, context, status });
      throw new HttpException(
        err?.message || 'Unauthorized',
        err?.status || HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
