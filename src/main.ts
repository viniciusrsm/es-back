import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS para permitir requisições do front-end
  app.enableCors({
    origin: 'http://localhost:3000', // Substitua pelo domínio do front em produção
    credentials: true, // Se você usar cookies/sessões
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
