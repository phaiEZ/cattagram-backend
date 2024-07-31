import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  update: Date;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  catName: string;

  @Column()
  ownerName: string;

  @Column()
  gender: string;

  @Column()
  breeds: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  profilePic?: string;
}
