import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // criar o usuário
  async create(createUserDto: CreateUserDto) {
    try {
      if (!createUserDto || !createUserDto.password) {
        throw new Error('User data or password is missing');
      }

      // Criptografe a senha
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const data = {
        name: createUserDto.name,
        cpf: createUserDto.cpf,
        cnpj: createUserDto.cnpj,
        phone: createUserDto.phone,
        ong: createUserDto.ong,
        socialMedia: createUserDto.socialMedia,
        email: createUserDto.email,
        password: hashedPassword,
      };

      // criar o usuário no banco de dados
      return await this.prisma.user.create({ data });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  // achar todos os  usuários
  async findAll() {
    return this.prisma.user.findMany({
      include: { animal: true, interest: true },
    });
  }

  // achar um usuário
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { idUser: id },
      include: { animal: true, interest: true },
    });
  }

  // atualizar um usuário
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { idUser: id },
      data: updateUserDto,
    });
  }

  // deletar um usuario
  async remove(id: number) {
    return this.prisma.user.delete({ where: { idUser: id } });
  }

  // validar o usuário no login
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // achar os animais cadastrados pelo usuário
  async findAnimalRegistered(id: number) {
    return this.prisma.user.findUnique({
      where: { idUser: id },
      select: {
        animal: true,
      },
    });
  }
}
