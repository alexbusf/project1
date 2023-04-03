import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTextblockDto {
    @IsString()
    @IsNotEmpty()
    readonly mainherotext: string;
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsString()
    @IsNotEmpty()
    readonly body: string;
    @IsNotEmpty()
    readonly groupId: number;
    @IsNotEmpty()
    readonly userId: number;
}
