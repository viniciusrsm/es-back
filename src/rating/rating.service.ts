import { ForbiddenException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable({ scope: Scope.REQUEST })
export class RatingService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    return await this.prisma.rating.create({ data: createRatingDto });
  }

  async findAll() {
    console.log(this.request);
    return await this.prisma.rating.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.rating.findUnique({ where: { id: id } });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    const userId = this.request['user']['sub'];
    if (userId !== id) throw new ForbiddenException();
    return await this.prisma.rating.update({
      where: { id: id },
      data: updateRatingDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.rating.delete({ where: { id: id } });
  }
}
