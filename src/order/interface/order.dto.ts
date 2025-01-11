import {IsArray, IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {ManyToOne, OneToMany} from "typeorm";
import {User} from "../../user/user.entity";
import {UserDto} from "../../user/dtos/user.dto";

export class OrderDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID of the user who owns the order' })
    userId: UserDto;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ description: 'Date of the order creation' })
    date: Date;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ description: 'JSON representation of order items' })
    items: { id: number; name: string;  quantity: number }[];

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Total amount of the order' })
    totalAmount: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Status of the order' })
    status: string;
}