import { MenuItem } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  price: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsNumber()
  @IsNotEmpty()
  menuId: number;
}
