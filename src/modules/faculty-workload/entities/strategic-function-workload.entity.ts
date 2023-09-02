import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { RemarksAndPoints } from './teaching-workload.entity';

@Entity('strategic-function-workload')
@Unique('userId', ['userID'])
export class StrategicFunctionWorkload {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userID: string;

  @Column({ nullable: true, array: true })
  public designationUniversityLevel: string;

  @Column({ nullable: true, array: true })
  public approvedUniversityDesignationFilePath: string;

  @Column({ nullable: true, array: true })
  public approvedUniversityDesignationFilenames: string;

  @Column({ nullable: true, array: true })
  public designationCollegeCampusLevel: string;

  @Column({ nullable: true, array: true })
  public approvedCollegeCampusDesignationFilePath: string;

  @Column({ nullable: true, array: true })
  public approvedCollegeCampusDesignationFilenames: string;

  @Column({ nullable: true, array: true })
  public designationDepartmentLevel: string;

  @Column({ nullable: true, array: true })
  public approvedDepartmentDesignationFilePath: string;

  @Column({ nullable: true, array: true })
  public approvedDepartmentDesignationFilenames: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademic: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademic1: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademic2: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademicFilePath: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademicFilename: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademicFilePath1: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademicFilename1: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademicFilePath2: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademicFilename2: string;

  // @Column({ nullable: true })
  // public coachAdviserCertificateFilePath: string;

  // @Column({ nullable: true })
  // public coachAdviserCertificateFilePath1: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhoc: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhoc1: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhoc2: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhocFilePath: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhocFilename: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhocFilePath1: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhocFilename1: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhocFilePath2: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhocFilename2: string;

  @Column({ nullable: true })
  public academicAdvisees: string;

  @Column({ nullable: true })
  public academicAdviseesFilePath: string;

  @Column({ nullable: true })
  public academicAdviseesFilename: string;

  @Column({ nullable: true, type: 'decimal' })
  public sfwPoints: number;

  @Column({ nullable: true })
  public status: string;

  @Column({ nullable: true })
  public currentProcessRole: string;

  @Column('jsonb', { nullable: true })
  public remarks: RemarksAndPoints;

  @Column()
  public isSubmitted: boolean;
}
