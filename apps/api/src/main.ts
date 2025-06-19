
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS設定
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // グローバルバリデーションパイプ
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Swagger設定
  const config = new DocumentBuilder()
    .setTitle('Couple Quiz API')
    .setDescription('カップル向けパーソナライズクイズアプリのAPI')
    .setVersion('1.0')
    .addTag('users', 'ユーザー管理')
    .addTag('couples', 'カップル管理')
    .addTag('questions', '質問管理')
    .addTag('responses', '回答管理')
    .addTag('ai', 'AI機能')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📚 API Docs: http://localhost:3000/api/docs');
}
bootstrap();
