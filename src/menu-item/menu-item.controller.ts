import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemService } from './menu-item.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Get()
  findAll() {
    return this.menuItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemService.update(+id, updateMenuItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemService.remove(+id);
  }
}
