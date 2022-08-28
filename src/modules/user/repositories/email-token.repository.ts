import { Repository } from 'typeorm';
import { CustomRepository } from '../../../database/typeorm-ex.decorator';
import { EmailToken } from '../entities/email-token.entity';

@CustomRepository(EmailToken)
export class EmailTokenRepository extends Repository<EmailToken> {}
