import { Module } from "@nestjs/common";
import { TextsService } from "./texts.service";
import { TextsController } from "./texts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TextEntity } from "./text.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TextEntity])],
    providers: [TextsService],
    controllers: [TextsController],
})
export class TextsModule {}
