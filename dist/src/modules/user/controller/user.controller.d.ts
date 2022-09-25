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
}
