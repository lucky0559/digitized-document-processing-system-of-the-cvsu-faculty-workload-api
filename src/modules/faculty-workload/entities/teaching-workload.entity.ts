import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  public remarks: string;
}
