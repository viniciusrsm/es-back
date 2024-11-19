import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async create(createRatingDto: CreateRatingDto) {
    return await this.prisma.rating.create({ data: createRatingDto });
  }

  async findAll() {
    return await this.prisma.rating.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.rating.findUnique({ where: { id: id } });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    return await this.prisma.rating.update({
      where: { id: id },
      data: updateRatingDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.rating.delete({ where: { id: id } });
  }
}
