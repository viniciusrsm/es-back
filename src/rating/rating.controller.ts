import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingService } from './rating.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
