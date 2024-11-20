import { IsNotEmpty,IsString } from "class-validator";

export class CreateToDo {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
