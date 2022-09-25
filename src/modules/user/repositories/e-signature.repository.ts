import { Repository } from 'typeorm';
import { CustomRepository } from '../../../database/typeorm-ex.decorator';
import { ESignature } from '../entities/e-signature.entity';

@CustomRepository(ESignature)
export class ESignatureRepository extends Repository<ESignature> {}
