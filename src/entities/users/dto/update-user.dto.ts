import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    name: string;
  
    @IsString()
    @IsOptional()
    cpf?: string;
  
    @IsString()
    @IsOptional()
    cnpj?: string;
  
    @IsString()
    @IsOptional()
    phone?: string;
  
  
    @IsString()
    @IsOptional()
    ong?: string;
  
    @IsString()
    @IsOptional()
    socialMedia?: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    password: string;
}
