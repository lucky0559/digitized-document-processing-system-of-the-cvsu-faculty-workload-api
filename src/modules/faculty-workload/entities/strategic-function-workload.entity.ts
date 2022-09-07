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
}
