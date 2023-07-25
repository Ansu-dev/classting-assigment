import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IndexModule } from './modules/index.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // * cors SetUp
    const envAllow = process.env.COMMERCE_ALLOW_CORS_LIST;
    if (envAllow) {
        const allowList = envAllow.split(',');
        app.enableCors({
            origin: allowList,
            methods: ['GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'],
            credentials: true,
        });
    }
    // * Swagger SetUp
    const config = new DocumentBuilder()
        .setTitle('Nest Template API')
        .setDescription('Nest Template 1.0 docs')
        .setVersion('1.0.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                name: 'user-auth',
                description: 'Enter JWT accessToken',
                in: 'header',
            },
            'x-access-token',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        include: [IndexModule],
        deepScanRoutes: true,
        ignoreGlobalPrefix: true,
    });
    const endPoint = process.env.SWAGEER_END_POINT ?? '/swagger';
    SwaggerModule.setup(endPoint, app, document);

    app.setGlobalPrefix('api/v2');

    const port = process.env.SEVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
    await app.listen(port, () => {
        Logger.log(`SERVER - ${port}PORT CONNECTED`);
    });
}
bootstrap();
