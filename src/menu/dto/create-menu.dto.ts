import { OmitType } from '@nestjs/mapped-types';
import { MenuEntity } from 'src/entities/menu.entity';

export class CreateMenuDto extends OmitType(MenuEntity, ['id']) {}
