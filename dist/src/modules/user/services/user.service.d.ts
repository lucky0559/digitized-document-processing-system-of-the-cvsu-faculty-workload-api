import { UserUpdateDto } from '../dtos/user-update.dto';
import { User } from '../entities/user.entity';
export declare class UserService {
    hashPassword(password: string): Promise<any>;
    sendEmail(email: string, email_token: string): Promise<void>;
    getAllUser(): Promise<User[]>;
    register(user: User): Promise<User>;
    login(username: string, password: string): Promise<User>;
    updateProfile(id: string, profileDto: UserUpdateDto): Promise<User>;
    deleteProfile(id: string): Promise<User>;
    verifyEmail(token: string): Promise<void>;
}
