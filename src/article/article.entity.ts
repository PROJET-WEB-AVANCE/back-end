import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from "../category/category.entity";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Category, category => category.articles)
  category: Category;
}
