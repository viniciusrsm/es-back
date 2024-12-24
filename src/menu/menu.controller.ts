import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuService } from './menu.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
