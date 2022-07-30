import { Repository } from 'typeorm';
import { CustomRepository } from '../../../database/typeorm-ex.decorator';
import { Profile } from '../entities/profile.entity';

@CustomRepository(Profile)
export class ProfileRepository extends Repository<Profile> {}
