import { UserUpdateDto } from '../dtos/user-update.dto';
import { User } from '../entities/user.entity';
import { ESignature } from '../entities/e-signature.entity';
export declare class UserService {
    hashPassword(password: string): Promise<any>;
    sendEmail(email: string, email_token: string): Promise<void>;
    getAllUser(): Promise<User[]>;
    getUser(userId: string): Promise<User>;
    register(user: User): Promise<User>;
    login(usernameEmail: string, password: string): Promise<User>;
    updateProfile(id: string, profileDto: UserUpdateDto): Promise<User>;
    deleteProfile(id: string): Promise<User>;
    verifyEmail(token: string): Promise<void>;
    uploadESignature(eSignature: ESignature): Promise<false | ESignature>;
    checkESignature(userId: string): Promise<boolean>;
    changePassword(username: string, oldPassword: string, password: string): Promise<string>;
    updateUserAdmin(email: string, role: string): Promise<string>;
    resetPassword(email: string): Promise<void>;
    findUserByPasswordCode(passwordResetCode: string): Promise<User>;
    resetChangePassword(username: string, password: string): Promise<string>;
    sendRemarks(currentProcessRole: string, userId: string, remarks: string): Promise<void>;
}
