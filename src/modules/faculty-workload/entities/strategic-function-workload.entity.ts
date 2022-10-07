import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('strategic-function-workload')
export class StrategicFunctionWorkload {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userID: string;

  @Column({ nullable: true, array: true })
  public designationUniversityLevel: string;

  @Column({ nullable: true })
  public approvedUniversityDesignationFilePath: string;

  @Column({ nullable: true, array: true })
  public designationCollegeCampusLevel: string;

  @Column({ nullable: true })
  public approvedCollegeCampusDesignationFilePath: string;

  @Column({ nullable: true, array: true })
  public designationDepartmentLevel: string;

  @Column({ nullable: true })
  public approvedDepartmentDesignationFilePath: string;

  @Column({ nullable: true })
  public designationAsSportTrainorAcademic: string;

  @Column({ nullable: true })
  public coachAdviserCertificateFilePath: string;

  @Column({ nullable: true })
  public designationAsMemberOfAdhoc: string;

  @Column({ nullable: true })
  public approvedDesignationFilePath: string;

  @Column({ nullable: true })
  public totalOfAcademicAdvisees: string;

  @Column({ nullable: true })
  public listOfAdviseesFilePath: string;

  @Column({ nullable: true, type: 'decimal' })
  public sfwPoints: number;

  @Column({ nullable: true })
  public status: string;

  @Column({ nullable: true })
  public currentProcessRole: string;
}
