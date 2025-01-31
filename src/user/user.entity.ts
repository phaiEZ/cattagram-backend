import { Catx } from 'src/catx/catx.entity';
import { Comment } from 'src/comment/comment.entity';
import { Image } from 'src/image/image.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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
  birthPlace: string;

  @Column()
  gender: string;

  @Column()
  breeds: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];

  @Column({ nullable: true })
  profilePic?: string;

  @OneToMany(() => Catx, (catx) => catx.user)
  catxs: Catx[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
