import { User } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";


// Converts a single ToDo entity to a DTO
export function userEntityToDto(userDB: UserEntity): User {
  const dto = new User();
  dto.id = userDB.id;
  dto.username = userDB.username;
  dto.password = userDB.password;
  return dto;
}