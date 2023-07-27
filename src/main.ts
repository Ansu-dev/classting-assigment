import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IndexModule } from './modules/index.module';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // * cors SetUp
    const envAllow = process.env.ALLOW_CORS_LIST;
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
        .setTitle('Classting Assigment API')
        .setDescription('Classting Assigment 1.0 docs')
        .setVersion('1.0.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            name: 'authorization',
            description: 'Enter JWT accessToken',
            in: 'header',
        })
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        include: [IndexModule],
        deepScanRoutes: true,
        ignoreGlobalPrefix: true,
    });
    const endPoint = process.env.SWAGEER_END_POINT ?? '/swagger';
    SwaggerModule.setup(endPoint, app, document);

    // * global interceptor
    app.useGlobalInterceptors(new LoggingInterceptor());

    // * prefix
    app.setGlobalPrefix('api/v1');

    const port = process.env.SEVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
    await app.listen(port, () => {
        Logger.log(`SERVER - ${port}PORT CONNECTED`);
    });
}
bootstrap();
