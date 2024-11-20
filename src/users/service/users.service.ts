
import { Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/auth/dto/Login.dto';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../dto/user.dto';
import { userEntityToDto } from '../mapper/user.mapper';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  )
  {}


  async findOne(username: string): Promise<User> {    
    var userDB = await this.userRepository.findOne({where:{username:username}})
    var user = null;
    if (userDB)
      user = userEntityToDto(userDB)
    return user;
  }

  registerUser(registerUser:LoginDTO): void {
    var createdUser = this.userRepository.create({username:registerUser.username, password:registerUser.password});
    this.userRepository.save(createdUser);
  }
}
