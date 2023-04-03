import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Textblock } from "src/textblock/entities/textblock.entity";
import { Profile } from "./profile.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  //связь One to One с User
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;

  //связь многие ко многим с ролями
  @ManyToMany(() => Role)
  @JoinTable()
   roles: Role[];

   //связь один ко многим с тектовыми блоками
   @OneToMany(() => Textblock, (textblock) => textblock.user)
   textblocks: Textblock[]; 
}
