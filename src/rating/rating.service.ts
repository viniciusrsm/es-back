import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UserService } from 'src/user/user.service';

@Injectable({ scope: Scope.REQUEST })
export class RatingService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    return await this.prisma.rating.create({ data: createRatingDto });
  }

  async findAll() {
    return await this.prisma.rating.findMany();
  }

  async findAllRatingsByRestaurantId(id: number) {
    return await this.prisma.rating.findMany({
      where: { restaurantId: id },
    });
  }

  async findAllRatingByUserId(userId: number) {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new BadRequestException(
        'Usuário não encontrado para encontrar as avaliações!',
      );
    }

    return await this.prisma.rating.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async findUserNameByRating(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        name: true,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado!');
    }

    return user.name;
  }

  async findOne(id: number) {
    return await this.prisma.rating.findUnique({ where: { id: id } });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    const userId = this.request['user']['sub'];
    const ratingUserId = (
      await this.prisma.rating.findUnique({ where: { id: id } })
    ).userId;
    if (userId !== ratingUserId) throw new ForbiddenException();
    return await this.prisma.rating.update({
      where: { id: id },
      data: updateRatingDto,
    });
  }

  async remove(id: number) {
    const userId = this.request['user']['sub'];
    const ratingUserId = (
      await this.prisma.rating.findUnique({ where: { id: id } })
    ).userId;
    if (userId !== ratingUserId) throw new ForbiddenException();
    return await this.prisma.rating.delete({ where: { id: id } });
  }
}
