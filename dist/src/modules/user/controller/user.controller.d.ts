import { UserUpdateDto } from '../dtos/user-update.dto';
import { ESignature } from '../entities/e-signature.entity';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUser(): Promise<User[]>;
    getUser(userId: string): Promise<User>;
    createUser(user: User): Promise<User>;
    login(username: string, password: string): Promise<User>;
    updateProfile(id: string, profileDto: UserUpdateDto): Promise<User>;
    deleteProfile(id: string): Promise<User>;
    verifyEmail(token: string): Promise<void>;
    uploadESignature(eSignature: ESignature): Promise<any>;
    checkESignature(userId: string): Promise<boolean>;
    changePassword(username: string, oldPassword: string, password: string): Promise<any>;
    changeUserRole(email: string, role: string, hourlyRate: number): Promise<any>;
    resetPassword(email: string): Promise<any>;
    findUserByPasswordCode(passwordResetCode: string): Promise<User>;
    resetChangePassword(username: string, password: string): Promise<any>;
    sendRemarks(currentProcessRole: string, email: string, remarks: string): Promise<any>;
}
