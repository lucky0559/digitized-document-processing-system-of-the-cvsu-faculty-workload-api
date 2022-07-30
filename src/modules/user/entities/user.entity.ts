import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  public profile: Profile;

  @CreateDateColumn()
  public created: Date;
}
