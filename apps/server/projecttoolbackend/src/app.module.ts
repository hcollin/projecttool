import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// import { TechnologyService } from "./technology/technology.service";
// import { TechnologyController } from "./technology/technology.controller";
import { TechnologyModule } from "./technology/technology.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env.development.local", ".env.development", ".env.local", ".env"],
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "projecttooluser",
            password: "password",
            database: "projecttooldb",
            entities: [],
            synchronize: true,
        }),
        TechnologyModule,

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
