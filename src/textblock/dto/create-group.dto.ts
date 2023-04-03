import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
}