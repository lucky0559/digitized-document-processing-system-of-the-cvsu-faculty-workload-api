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
  public totalNoOfHours: string;

  @Column({ nullable: true })
  public twlFilePath: string;
}
