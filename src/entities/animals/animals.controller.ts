import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { Request } from 'express';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  // rota criar um animal
  @Post()
  async create(@Req() request: Request) {
    const formData = request.body;

    // Remove o prefixo data:image/jpeg;base64, se estiver presente
    const imageBase64 = formData.image ? formData.image.split(',')[1] : null;

    const createAnimalDto: CreateAnimalDto = {
      name: formData.name,
      gender: formData.gender,
      size: formData.size,
      age: formData.age,
      species: formData.species,
      breed: formData.breed,
      information: formData.information,
      city: formData.city,
      state: formData.state,
      adress: formData.adress,
      neighborhood: formData.neighborhood,
      number: formData.number,
      image: imageBase64, // Armazena a imagem em Base64
      userId: formData.userId,
    };

    return this.animalsService.create(createAnimalDto);
  }
  // rota pra pegar a imagem do animal
  @Get('image/:id')
  async getImage(@Param('id') id: number, @Res() res: Response) {
    const animal = await this.animalsService.findOne(id);

    if (animal && animal.image) {
      const imageBuffer = animal.image;

      (res as any).setHeader('Content-Type', 'image/jpeg');
      (res as any).send(imageBuffer);
    } else {
      throw new HttpException('Imagem não encontrada', HttpStatus.NOT_FOUND);
    }
  }

  // rota pra pegar todos os animais
  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  // rota pra buscar um animal de acordo com o id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.animalsService.findOne(+id);
  }

  // rota pra atualizar um animal de acordo com o id
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(id, updateAnimalDto);
  }

  // rota pra deletar o animal
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.animalsService.remove(+id);
  }
}
