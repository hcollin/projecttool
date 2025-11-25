import { Module } from "@nestjs/common";
import { RoletemplateService } from "./roletemplate.service";
import { RoletemplateController } from "./roletemplate.controller";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { RoleTemplateEntity } from "./roletemplate.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RoleTemplateEntity])],
    controllers: [RoletemplateController],
    providers: [RoletemplateService],
})
export class RoletemplateModule {}
