import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { LoginDTO } from '../dto/Login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService
    ,private jwtService: JwtService
  ) { }



  async signIn(loginUser: LoginDTO): Promise<any> {
    const user = await this.usersService.findOne(loginUser.username);
    var isValidPasswod = await bcrypt.compare(loginUser.password, user.password);
    
    if (!user || !isValidPasswod ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload,{secret:process.env.JWT_SECRET_KEY}),
      // refresh_token: await this.jwtService.
    };
  }


  async register(loginUser: LoginDTO): Promise<any> {
    var userExists = await this.usersService.findOne(loginUser.username)
    if (userExists)
      throw new ConflictException('This username is already used');

    var hashedPassword = await this.hashPassword(loginUser.password);
    loginUser.password = hashedPassword;
    this.usersService.registerUser(loginUser);

  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds (higher = more secure but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }


}
