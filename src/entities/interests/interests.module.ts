import { Module } from '@nestjs/common';
import { InterestService } from 'src/entities/interests/interests.service';
import { InterestController } from 'src/entities/interests/interests.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [InterestController],
  providers: [InterestService, PrismaService],
})
export class InterestsModule {}
