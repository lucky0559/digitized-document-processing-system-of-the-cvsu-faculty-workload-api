import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('strategic-function-workload')
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
  public designationCollegeCampusLevel: string;

  @Column({ nullable: true, array: true })
  public approvedCollegeCampusDesignationFilePath: string;

  @Column({ nullable: true, array: true })
  public designationDepartmentLevel: string;

  @Column({ nullable: true, array: true })
  public approvedDepartmentDesignationFilePath: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademic: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademic1: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademic2: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademicFilePath: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademicFilePath1: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademicFilePath2: string;

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
  public designationAsMemberOfAdhocFilePath1: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhocFilePath2: string;

  @Column({ nullable: true })
  public academicAdvisees: string;

  @Column({ nullable: true })
  public academicAdviseesFilePath: string;

  @Column({ nullable: true, type: 'decimal' })
  public sfwPoints: number;

  @Column({ nullable: true })
  public status: string;

  @Column({ nullable: true })
  public currentProcessRole: string;

  @Column({ nullable: true })
  public remarks: string;
}
