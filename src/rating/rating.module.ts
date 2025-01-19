import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
