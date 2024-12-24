import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, senhaLogin: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user?.senha !== senhaLogin) {
      throw new UnauthorizedException();
    }
    //const { senha, ...result } = user;
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
