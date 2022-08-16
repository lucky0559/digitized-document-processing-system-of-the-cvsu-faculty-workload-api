import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

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

  @Column({ nullable: true })
  public role?: string;
}
