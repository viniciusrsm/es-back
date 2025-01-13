import { Menu } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MenuEntity implements Menu {
  id: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;
}
