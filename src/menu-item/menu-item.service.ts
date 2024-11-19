import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuItemDto: CreateMenuItemDto) {
    return await this.prisma.menuItem.create({ data: createMenuItemDto });
  }

  async findAll() {
    return await this.prisma.menuItem.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.menuItem.findUnique({ where: { id: id } });
  }

  async update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    return await this.prisma.menuItem.update({
      where: { id: id },
      data: updateMenuItemDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.menuItem.delete({ where: { id: id } });
  }
}
