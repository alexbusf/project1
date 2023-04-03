import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fileblock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;
}