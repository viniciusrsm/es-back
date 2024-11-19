import { OmitType } from '@nestjs/mapped-types';
import { RestaurantEntity } from 'src/entities/restaurant.entity';

export class CreateRestaurantDto extends OmitType(RestaurantEntity, ['id']) {}
