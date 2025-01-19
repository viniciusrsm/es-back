import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UserService } from 'src/user/user.service';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    return await this.prisma.menu.create({ data: createMenuDto });
  }

  async findAll() {
    return await this.prisma.menu.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.menu.findUnique({ where: { id: id } });
  }

  async findMenusByUserId(userId: number) {
    const response = await this.prisma.menu.findMany({
      where: {
        userId: userId,
      },
    });
    return response;
  }

  async findByRestaurantId(resId: number) {
    return await this.prisma.menu.findMany({
      where: {
        restaurantId: resId,
      },
    });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto, userId: number) {
    // Busca o menu pelo ID
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    });

    // Verifica se o menu existe
    if (!menu) {
      throw new ForbiddenException('Menu not found');
    }

    // Verifica se o usuário autenticado é o proprietário do menu
    if (menu.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this menu');
    }

    // Atualiza o menu com os dados fornecidos
    return this.prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  async remove(id: number) {
    const userId = this.request['user']['sub'];
    const menuUserId = (
      await this.prisma.menu.findUnique({
        where: { id: id },
      })
    ).userId;
    if (userId !== menuUserId) throw new ForbiddenException();
    return await this.prisma.menu.delete({ where: { id: id } });
  }
}
