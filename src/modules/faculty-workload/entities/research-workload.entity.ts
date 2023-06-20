import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RemarksAndPoints } from './teaching-workload.entity';

@Entity('research-workload')
export class ResearchWorkload {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userID: string;

  @Column({ nullable: true })
  public titleOfStudy: string;

  @Column({ nullable: true })
  public fundingOfStudy: string;

  @Column({ nullable: true })
  public typeOfStudy: string;

  @Column({ nullable: true })
  public designationStudy: string;

  @Column({ nullable: true })
  public fundGenerated: string;

  @Column({ nullable: true, array: true })
  public disseminatedResearch: string;

  @Column({ nullable: true })
  public rwlFilePath: string;

  @Column({ nullable: true })
  public rwlFilePath1: string;

  @Column({ nullable: true, array: true })
  public disseminatedResearchFilesPath: string;

  @Column({ nullable: true })
  public rwlPoints: number;

  @Column({ nullable: true })
  public status: string;

  @Column({ nullable: true })
  public currentProcessRole: string;

  @Column('jsonb', { nullable: true, array: true })
  public remarks: RemarksAndPoints;
}
