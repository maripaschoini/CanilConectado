import { IsString, IsOptional, IsInt, IsNotEmpty} from "class-validator";

export class CreateAnimalDto {

    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsOptional()
    gender?: string;
  
    @IsString()
    @IsNotEmpty()
    size: string;
  
    @IsInt()
    @IsNotEmpty()
    age: number;
  
    @IsString()
    @IsNotEmpty()
    species: string;
  
    @IsString()
    @IsNotEmpty()
    breed: string;
  
    @IsString()
    @IsNotEmpty()
    information: string;
  
    @IsString()
    @IsNotEmpty()
    city: string;
  
    @IsString()
    @IsNotEmpty()
    state: string;
  
    @IsString()
    @IsNotEmpty()
    adress: string;
  
    @IsString()
    @IsNotEmpty()
    neighborhood: string;
  
    @IsInt()
    @IsOptional()
    number?: number;

    @IsString()
    @IsOptional()
    image?: string; 

    @IsInt()
    @IsNotEmpty()
    userId: number; 
}
