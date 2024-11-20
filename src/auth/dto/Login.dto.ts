import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @IsNotEmpty({message:"username should not be empty"})
    @IsString({message:"username should be a string"})
    username: string;

    @IsNotEmpty({message:"password should not be empty"})
    @IsString({message:"password should be a string"})
    password: string;
}