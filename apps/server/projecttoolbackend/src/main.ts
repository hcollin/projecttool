import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder()
        .setTitle("Project Tool API")
        .setDescription("API documentation for the Project Tool Backend")
        .setVersion("1.0")
        .addTag("Project Tool")
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, documentFactory());

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
