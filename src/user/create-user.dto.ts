import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsInt() readonly id: number;
  @IsString() readonly username: string;
  @IsString() readonly email: string;
  @IsString() readonly password: string;
  @IsString() readonly surname: string;
  @IsString() readonly firstName: string;
  @IsString() readonly middleInitial: string;
  @IsString() readonly campus: string;
  @IsString() readonly department: string;
  @IsString() readonly role: string;
  @IsString() readonly natureOfAppointment: string;
}
