import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Custom modules
import { TechnologyModule } from "./technology/technology.module";
import { RoletemplateModule } from "./roletemplate/roletemplate.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env.development.local", ".env.development", ".env.local", ".env"],
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || "projecttooldb",
            autoLoadEntities: true,
            synchronize: true,
        }),
        TechnologyModule,
        RoletemplateModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
