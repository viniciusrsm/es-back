import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    return await this.prisma.restaurant.create({ data: createRestaurantDto });
  }

  async findAll() {
    return await this.prisma.restaurant.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.restaurant.findUnique({ where: { id: id } });
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return await this.prisma.restaurant.update({
      where: { id: id },
      data: updateRestaurantDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.restaurant.delete({ where: { id: id } });
  }
}
