import { OmitType } from '@nestjs/mapped-types';
import { RatingEntity } from 'src/entities/rating.entity';

export class CreateRatingDto extends OmitType(RatingEntity, ['id']) {}
