import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class InterestService {
  constructor(private prisma: PrismaService) {}

  // Função para criar um interesse
  async createInterest(userId: number, animalId: number) {
    return this.prisma.interest.create({
      data: {
        idUser: userId,
        idAnimal: animalId,
        interestedAt: new Date(),
        confirmed: true,
      },
    });
  }

  // Função para excluir um interesse pelo ID
  async deleteInterest(userId: number, animalId: number) {
    return this.prisma.interest.deleteMany({
      where: {
        idUser: userId,
        idAnimal: animalId,
      },
    });
  }

  // Função para encontrar todos os interesses de um usuário
  async findUserInterests(userId: number) {
    userId = Number(userId);
    return this.prisma.interest.findMany({
      where: { idUser: userId },
      include: {
        animal: true,
      },
    });
  }

  // Função para encontrar o usuário que cadastrou o animal
  async findUserByAnimal(animalId: number) {
    animalId = Number(animalId);
    return this.prisma.animal.findUnique({
      where: { idAnimal: animalId },
      select: {
        user: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });
  }
}
