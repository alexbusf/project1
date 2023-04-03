import { IsNotEmpty, IsString } from 'class-validator';

export class CrealeFileBlockDto {
    @IsNotEmpty()
    @IsString()
    readonly path: string;
}