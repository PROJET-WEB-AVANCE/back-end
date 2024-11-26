import {
  BeforeInsert,
  BeforeUpdate,
  ChildEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  type: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

@ChildEntity()
export class Admin extends User {}

@ChildEntity()
export class Sales extends User {}

@ChildEntity()
export class Client extends User {

}
