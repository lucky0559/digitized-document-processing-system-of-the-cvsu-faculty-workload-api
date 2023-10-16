import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type RemarksAndPoints = {
  key: string;
  points: string;
  remarks: string;
};

@Entity('teaching-workload')
export class TeachingWorkload {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userID: string;

  @Column({ nullable: true })
  public numberOfPreparations: string;

  @Column({ nullable: true })
  public contactHours: string;

  @Column({ nullable: true })
  public totalNoOfStudents: string;

  @Column({ nullable: true })
  public twlFilePath: string;

  @Column({ nullable: true, type: 'decimal' })
  public totalTeachingWorkload: number;

  @Column({ nullable: true })
  public status: string;

  @Column({ nullable: true })
  public currentProcessRole: string;

  @Column('jsonb', { nullable: true })
  public remarks: RemarksAndPoints;

  @Column()
  public isSubmitted: boolean;

  @Column({ nullable: true })
  public filename: string;

  @Column('jsonb', { nullable: true })
  public deanPoints: RemarksAndPoints;
}
