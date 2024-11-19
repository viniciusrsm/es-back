import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    return await this.prisma.menu.create({ data: createMenuDto });
  }

  async findAll() {
    return await this.prisma.menu.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.menu.findUnique({ where: { id: id } });
  }

  async remove(id: number) {
    return await this.prisma.menu.delete({ where: { id: id } });
  }
}
