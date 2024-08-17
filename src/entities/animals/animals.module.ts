import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { PrismaModule } from 'prisma/prima.module';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  imports: [PrismaModule],
  controllers: [AnimalsController],
  providers: [AnimalsService, PrismaService],
})
export class AnimalsModule {}
