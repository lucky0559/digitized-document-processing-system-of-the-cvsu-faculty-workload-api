import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  public user: User;

  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public surname: string;

  @Column()
  public firstName: string;

  @Column()
  public middleInitial: string;

  @Column()
  public campus: string;

  @Column()
  public department: string;

  @Column()
  public role: string;

  @Column()
  public natureOfAppointment: string;
}
