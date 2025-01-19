import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UserService } from 'src/user/user.service';

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
    return await this.prisma.menu.findMany({
      where: {
        userId: userId,
      },
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
