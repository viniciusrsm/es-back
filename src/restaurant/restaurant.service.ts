import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

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
    const userId = this.request['user']['sub'];
    const restaurantUserId = (
      await this.prisma.restaurant.findUnique({ where: { id: id } })
    ).userId;
    if (userId !== restaurantUserId) throw new ForbiddenException();
    return await this.prisma.restaurant.update({
      where: { id: id },
      data: updateRestaurantDto,
    });
  }

  async remove(id: number) {
    const userId = this.request['user']['sub'];
    const restaurantUserId = (
      await this.prisma.restaurant.findUnique({ where: { id: id } })
    ).userId;
    if (userId !== restaurantUserId) throw new ForbiddenException();
    return await this.prisma.restaurant.delete({ where: { id: id } });
  }
}
