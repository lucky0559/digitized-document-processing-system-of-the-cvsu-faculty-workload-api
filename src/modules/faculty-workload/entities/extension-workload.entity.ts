import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RemarksAndPoints } from './teaching-workload.entity';

@Entity('extension-workload')
export class ExtensionWorkload {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public userID: string;

  @Column({ nullable: true, array: true })
  public designationExtensionActivity: string;

  @Column({ nullable: true })
  public extensionActivityFilePath: string;

  @Column({ nullable: true, array: true })
  public resourcePerson: string;

  @Column({ nullable: true, array: true })
  public certificateFilePath: string;

  @Column({ nullable: true })
  public totalNumberHours: string;

  @Column({ nullable: true })
  public summaryOfHoursFilePath: string;

  @Column({ nullable: true, type: 'decimal' })
  public ewlPoints: number;

  @Column({ nullable: true })
  public status: string;

  @Column({ nullable: true })
  public currentProcessRole: string;

  @Column('jsonb', { nullable: true })
  public remarks: RemarksAndPoints;
}
