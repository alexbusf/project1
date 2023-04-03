import { User } from "src/profiles/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";


@Entity()
export class Textblock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mainherotext: string;

  @Column()
  title: string;

  @Column()
  body: string;

  //связь многие к одному с группой
  @ManyToOne(() => Group, (group) => group.textblocks)
  group: Group

  //связь многие к одному с пользователями
  @ManyToOne(() => User, (user) => user.textblocks)
  user: User;
}
