import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Category} from "../category/category.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reference: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    image: string;

    @ManyToOne(() => Category, category => category.articles)
    category: Category;
}
