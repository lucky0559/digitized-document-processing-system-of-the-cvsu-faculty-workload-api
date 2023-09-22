import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  CvsuFunded,
  ExternallyFunded,
} from '../../faculty-workload/entities/research-workload.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public workloadId: string;

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

  @Column({ nullable: true })
  public emailToken: string;

  @Column({ default: false })
  public verified: boolean;

  @Column()
  public academicRank: string;

  @Column({ nullable: true })
  public twlFilePath?: string;

  @Column('jsonb', { nullable: true, array: true })
  public cvsuFunded: CvsuFunded;

  @Column('jsonb', { nullable: true, array: true })
  public externallyFunded: ExternallyFunded;

  @Column({ nullable: true, array: true })
  public disseminatedResearchFilesPath?: string;

  @Column({ nullable: true })
  public extensionActivityFilePath?: string;

  @Column({ nullable: true })
  public certificateFilePath?: string;

  @Column({ nullable: true })
  public summaryOfHoursFilePath?: string;

  @Column({ nullable: true })
  public approvedUniversityDesignationFilePath?: string;

  @Column({ nullable: true })
  public approvedCollegeCampusDesignationFilePath?: string;

  @Column({ nullable: true })
  public approvedDepartmentDesignationFilePath?: string;

  @Column({ nullable: true })
  public coachAdviserCertificateFilePath?: string;

  @Column({ nullable: true })
  public approvedDesignationFilePath?: string;

  @Column({ nullable: true })
  public listOfAdviseesFilePath?: string;

  @Column({ nullable: true })
  public remarks?: string;

  @Column({ nullable: true, type: 'decimal' })
  public ewlPoints: number;

  @Column({ nullable: true })
  public rwlPoints: number;

  @Column({ nullable: true, type: 'decimal' })
  public sfwPoints: number;

  @Column({ nullable: true, type: 'decimal' })
  public twlPoints: number;

  @Column({ nullable: true })
  public passwordResetCode: string;

  @Column('decimal', { nullable: true })
  public hourlyRate: number;
}
