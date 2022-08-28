import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('email-token')
export class EmailToken {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: string;

  @Column()
  public token: string;
}
