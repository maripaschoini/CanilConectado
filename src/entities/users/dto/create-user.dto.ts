import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
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
