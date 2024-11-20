import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authenthication.service';
import { AuthenticationController } from './controllers/authenthication.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AuthModule {}
