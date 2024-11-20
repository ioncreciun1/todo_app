
import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards,Request } from '@nestjs/common';
import { AuthenticationService } from '../services/authenthication.service';
import { LoginDTO } from '../dto/Login.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDTO: LoginDTO) {
    return this.authService.signIn(loginDTO);
  }


  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() loginDTO: LoginDTO) {
    return this.authService.register(loginDTO);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
