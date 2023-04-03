import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsString()
    @IsNotEmpty()
    readonly description: string;
}