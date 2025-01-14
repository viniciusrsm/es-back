import { MenuItem } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MenuItemEntity implements MenuItem {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  menuId: number;
}
