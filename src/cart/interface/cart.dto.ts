import {IsArray, IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CartDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID of the user who owns the cart' })
    userId: number;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ description: 'Date of the cart creation' })
    date: Date;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ description: 'JSON representation of cart items' })
    items: { id: number; name: string;  quantity: number }[];

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Total amount of the cart' })
    totalAmount: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Status of the cart' })
    status: string;
}