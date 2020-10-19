import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
    .setTitle('Qwiz & Go API')
    .setDescription('Description of Qwiz & Go API')
    .setVersion('1.0')
    .addTag('Quiz')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
