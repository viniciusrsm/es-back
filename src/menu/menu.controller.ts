import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuService } from './menu.service';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { REQUEST } from '@nestjs/core';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Get('/find/:userId')
  findMenusByUserId(@Param('userId') userId: string) {
    return this.menuService.findMenusByUserId(+userId);
  }

  @Get('by/restaurant/:resId')
  findByRestaurantId(@Param('resId') resId: string) {
    return this.menuService.findByRestaurantId(+resId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/:userId')
  update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return this.menuService.update(+id, updateMenuDto, +userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
