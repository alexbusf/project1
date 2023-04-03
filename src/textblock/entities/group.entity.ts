import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Textblock } from "./textblock.entity";


@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToMany(() => Textblock, (textblock) => textblock.group)
  textblocks: Textblock[];
}