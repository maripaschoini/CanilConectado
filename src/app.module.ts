import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entities/users/users.module';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prima.module';
import { AnimalsModule } from './entities/animals/animals.module';
import { InterestsModule } from './entities/interests/interests.module';

import * as session from 'express-session';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [UsersModule, PrismaModule, AnimalsModule, InterestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
