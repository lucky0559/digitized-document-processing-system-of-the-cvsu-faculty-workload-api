import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('extension-workload')
export class ExtensionWorkload {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public userID: string;

  @Column({ nullable: true })
  public designationExtensionActivity: string;

  @Column({ nullable: true })
  public extensionActivityFilePath: string;

  @Column({ nullable: true })
  public resourcePerson: string;

  @Column({ nullable: true })
  public certificateFilePath: string;

  @Column({ nullable: true })
  public totalNumberHours: string;

  @Column({ nullable: true })
  public summaryOfHoursFilePath: string;

  @Column({ nullable: true, type: 'decimal' })
  public ewlPoints: number;
}
