import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from "../user/user.entity";
import {Estatus} from "./interface/status.enum";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: false })
    userId: number;

    @Column()
    date: Date;

    @Column('json')
    items: { id: number; quantity: number }[];

    @Column('decimal', { precision: 10, scale: 2 })
    totalAmount: number;

    @Column({ default: Estatus.PENDING })
    status: Estatus;
}