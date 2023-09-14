import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RemarksAndPoints } from './teaching-workload.entity';

export type CvsuFunded = {
  title: string;
  typeOfStudy: string;
  designationStudy: string;
  file?: File;
  filename?: string;
  filePath?: string;
  points: number;
};

export type ExternallyFunded = {
  title: string;
  fundGenerated: string;
  file?: File;
  filename?: string;
  filePath?: string;
  points: number;
};

@Entity('research-workload')
export class ResearchWorkload {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userID: string;

  @Column('jsonb', { nullable: true, array: true })
  public cvsuFunded: CvsuFunded;

  @Column('jsonb', { nullable: true, array: true })
  public externallyFunded: ExternallyFunded;

  @Column({ nullable: true, array: true })
  public cvsuFundedFilenames: string;

  @Column({ nullable: true, array: true })
  public cvsuFundedFilePath: string;

  @Column({ nullable: true, array: true })
  public externallyFundedFilenames: string;

  @Column({ nullable: true, array: true })
  public externallyFundedFilePath: string;

  @Column({ nullable: true, array: true })
  public disseminatedResearch: string;

  @Column({ nullable: true, array: true })
  public disseminatedResearchFilesPath: string;

  @Column({ nullable: true })
  public rwlPoints: number;

  @Column({ nullable: true })
  public status: string;

  @Column({ nullable: true })
  public currentProcessRole: string;

  @Column('jsonb', { nullable: true })
  public remarks: RemarksAndPoints;

  @Column()
  public isSubmitted: boolean;

  @Column({ nullable: true, array: true })
  public disseminatedResearchFilenames: string;
}
