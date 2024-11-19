import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MenuItemController } from './menu-item.controller';
import { MenuItemService } from './menu-item.service';

@Module({
  imports: [PrismaModule],
  controllers: [MenuItemController],
  providers: [MenuItemService],
})
export class MenuItemModule {}
