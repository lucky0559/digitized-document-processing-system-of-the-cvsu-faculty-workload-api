import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('config')
export class Config {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public semester: string;

  @Column({ nullable: true })
  public schoolYearStart: number;

  @Column({ nullable: true })
  public schoolYearEnd: number;

  @Column({ nullable: true, type: 'timestamptz' })
  public submissionDateStart: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  public submissionDateEnd: Date;

  @Column('decimal', { nullable: true })
  public hourlyRate: number;
}
