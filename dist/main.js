"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const index_module_1 = require("./modules/index.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const envAllow = process.env.COMMERCE_ALLOW_CORS_LIST;
    if (envAllow) {
        const allowList = envAllow.split(',');
        app.enableCors({
            origin: allowList,
            methods: ['GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'],
            credentials: true,
        });
    }
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Webudding Commerce API')
        .setDescription('Webudding Commerce 2.0 docs')
        .setVersion('2.0.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        name: 'user-auth',
        description: 'Enter JWT accessToken',
        in: 'header',
    }, 'user-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        include: [index_module_1.IndexModule],
        deepScanRoutes: true,
        ignoreGlobalPrefix: true,
    });
    const endPoint = (_a = process.env.SWAGEER_END_POINT) !== null && _a !== void 0 ? _a : '/swagger';
    swagger_1.SwaggerModule.setup(endPoint, app, document);
    const port = process.env.SEVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
    await app.listen(port, () => {
        common_1.Logger.log(`SERVER - ${port}PORT CONNECTED`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map