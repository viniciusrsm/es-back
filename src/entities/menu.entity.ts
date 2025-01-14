import { Menu } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MenuEntity implements Menu {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;
}
