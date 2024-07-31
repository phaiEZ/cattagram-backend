import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  update: Date;

  @Column()
  profilePic: string;

  @ManyToOne(() => User, (user) => user.images)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  description: string;
}
