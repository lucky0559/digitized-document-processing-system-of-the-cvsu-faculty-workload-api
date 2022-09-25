import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('e-signature')
export class ESignature {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public eSignatureFilePath: string;

  @Column()
  public fileName: string;
}
