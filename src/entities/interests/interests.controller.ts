import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { InterestService } from 'src/entities/interests/interests.service';

@Controller('interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  // rota pra criar um interesse
  @Post('create')
  async create(@Body() body: { userId: number; animalId: number }) {
    return this.interestService.createInterest(body.userId, body.animalId);
  }

  // rota pra deletar um interesse
  @Delete('delete')
  async delete(@Body() body: { userId: number; animalId: number }) {
    return this.interestService.deleteInterest(body.userId, body.animalId);
  }

  // rota pra pegar o usuário de acordo com o id
  @Get('user/:userId')
  async findUserInterests(@Param('userId') userId: number) {
    return this.interestService.findUserInterests(userId);
  }

  // rota pra pegar o usuário do animal de acordo com o id do animal
  @Get('animal/:animalId/user')
  async findUserByAnimal(@Param('animalId') animalId: number) {
    return this.interestService.findUserByAnimal(animalId);
  }
}
