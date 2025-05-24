import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Enable CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : 'http://localhost:3000',
    credentials: true,
  });

  // Apply security middleware
  app.use(helmet());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Vehicle Transfer System API')
    .setDescription('API documentation for the Vehicle Transfer System')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('transfers', 'Vehicle transfer management endpoints')
    .addApiKey(
      {
        type: 'apiKey',
        in: 'cookie',
        name: 'jwt',
        description: 'JWT token stored in HTTP-only cookie. Use the login endpoint to obtain this token.'
      },
      'cookie-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
