import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    if (!request.headers || !request.headers.authorization) {
      throw new UnauthorizedException();
    }

    const { authorization } = request.headers;
    const user = verify(authorization, process.env.ACCESS_TOKEN_KEY, (err, data) => {
      if (err) {
        throw new UnauthorizedException();
      }
      return data
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return true
  }
}
