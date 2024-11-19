import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserEntity implements User {
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
