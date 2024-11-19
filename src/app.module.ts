import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuItemModule } from './menu-item/menu-item.module';
import { MenuModule } from './menu/menu.module';
import { RatingModule } from './rating/rating.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    RestaurantModule,
    RatingModule,
    MenuModule,
    MenuItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
