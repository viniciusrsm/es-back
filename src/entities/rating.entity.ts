import { Rating } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RatingEntity implements Rating {
  id: number;

  @IsNumber()
  @IsNotEmpty()
  stars: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;
}
