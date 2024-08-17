import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // rota pra login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.usersService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      idUser: user.idUser,
      message: 'Login bem-sucedido',
    };
  }

  // rota pra criar o usuário
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // pegar os animais que o usuário cadastrou
  @Get(':idUser/animals')
  async getAnimals(@Param('idUser') idUser: string) {
    const userId = parseInt(idUser, 10);
    return this.usersService.findAnimalRegistered(userId);
  }

  // pegar os usuários
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // pegar o usuário de acordo com o id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // atualizar o usuário de acordo com o id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // deletar o usuario
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
