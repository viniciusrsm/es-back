import { Menu } from '@prisma/client';

export class MenuEntity implements Menu {
  id: number;
  userId: number;
  restaurantId: number;
}
