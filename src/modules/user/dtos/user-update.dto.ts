import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  public username: string;

  @ApiPropertyOptional()
  @IsOptional()
  public email: string;

  @ApiPropertyOptional()
  @IsOptional()
  public surname: string;

  @ApiPropertyOptional()
  @IsOptional()
  public firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  public middleInitial: string;

  @ApiPropertyOptional()
  @IsOptional()
  public campus: string;

  @ApiPropertyOptional()
  @IsOptional()
  public department: string;

  @ApiPropertyOptional()
  @IsOptional()
  public role?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public academicRank: string;
}
