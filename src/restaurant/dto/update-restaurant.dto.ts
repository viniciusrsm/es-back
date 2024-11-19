import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(
  OmitType(CreateRestaurantDto, ['userId']),
) {}
