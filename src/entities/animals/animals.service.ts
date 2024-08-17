import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService) {}

  // criação do animal
  async create(createAnimalDto: CreateAnimalDto) {
    const data = {
      name: createAnimalDto.name,
      gender: createAnimalDto.gender,
      size: createAnimalDto.size,
      age: createAnimalDto.age,
      species: createAnimalDto.species,
      breed: createAnimalDto.breed,
      information: createAnimalDto.information,
      city: createAnimalDto.city,
      state: createAnimalDto.state,
      adress: createAnimalDto.adress,
      neighborhood: createAnimalDto.neighborhood,
      number: createAnimalDto.number,
      image: createAnimalDto.image
        ? Buffer.from(createAnimalDto.image, 'base64')
        : null,
      user: {
        connect: {
          idUser: createAnimalDto.userId,
        },
      },
    };
    return this.prisma.animal.create({ data });
  }
 
  // achar todos os animais
  async findAll() {
    return this.prisma.animal.findMany();
  }

  // achar um animal
  async findOne(id: number) {
    return this.prisma.animal.findUnique({ where: { idAnimal: id } });
  }

  // atualizar um animal
  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    console.log('Updating animal with ID:', id);
    console.log('Update data:', updateAnimalDto);

    id = Number(id);
    updateAnimalDto.age = Number(updateAnimalDto.age);
    updateAnimalDto.number = updateAnimalDto.number
      ? Number(updateAnimalDto.number)
      : undefined;
    updateAnimalDto.userId = Number(updateAnimalDto.userId);

    return this.prisma.animal.update({
      where: { idAnimal: id },
      data: {
        name: updateAnimalDto.name,
        gender: updateAnimalDto.gender,
        size: updateAnimalDto.size,
        age: updateAnimalDto.age,
        species: updateAnimalDto.species,
        breed: updateAnimalDto.breed,
        information: updateAnimalDto.information,
        city: updateAnimalDto.city,
        state: updateAnimalDto.state,
        adress: updateAnimalDto.adress,
        neighborhood: updateAnimalDto.neighborhood,
        number: updateAnimalDto.number,
        user: updateAnimalDto.userId
          ? {
              connect: { idUser: updateAnimalDto.userId },
            }
          : undefined,
      },
    });
  }
 
  // deletar um animal
  async remove(id: number) {
    return this.prisma.animal.delete({ where: { idAnimal: id } });
  }
}
