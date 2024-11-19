import { OmitType } from '@nestjs/mapped-types';
import { MenuItemEntity } from 'src/entities/menu-item.entity';

export class CreateMenuItemDto extends OmitType(MenuItemEntity, ['id']) {}
