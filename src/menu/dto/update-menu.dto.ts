import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(
  PickType(CreateMenuDto, ['name']),
) {}
