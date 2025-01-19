import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto) {
    return await this.prisma.menuItem.create({ data: createMenuItemDto });
  }

  async findAll() {
    return await this.prisma.menuItem.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.menuItem.findUnique({ where: { id: id } });
  }

  async findItemByMenuId(menuId: number) {
    return await this.prisma.menuItem.findMany({
      where: {
        menuId: menuId,
      },
    });
  }

  async update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    const userId = this.request['user']['sub'];
    const menuId = (
      await this.prisma.menuItem.findUnique({ where: { id: id } })
    ).menuId;
    const menuUserId = (
      await this.prisma.menu.findUnique({
        where: { id: menuId },
      })
    ).userId;
    if (userId !== menuUserId) throw new ForbiddenException();
    return await this.prisma.menuItem.update({
      where: { id: id },
      data: updateMenuItemDto,
    });
  }

  async remove(id: number) {
    const userId = this.request['user']['sub'];
    const menuId = (
      await this.prisma.menuItem.findUnique({ where: { id: id } })
    ).menuId;
    const menuUserId = (
      await this.prisma.menu.findUnique({
        where: { id: menuId },
      })
    ).userId;
    if (userId !== menuUserId) throw new ForbiddenException();
    return await this.prisma.menuItem.delete({ where: { id: id } });
  }
}
