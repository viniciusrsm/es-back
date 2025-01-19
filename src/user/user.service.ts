import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { username: username },
    });
  }

  async findInfoByUser(userId: number) {
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        name: true,
        username: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userId = this.request['user']['sub'];
    if (userId !== id) throw new ForbiddenException();
    return await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const userId = this.request['user']['sub'];
    if (userId !== id) throw new ForbiddenException();
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
