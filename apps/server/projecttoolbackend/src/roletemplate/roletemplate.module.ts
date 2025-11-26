import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RoletemplateService } from "./roletemplate.service";
import { RoletemplateController } from "./roletemplate.controller";
import { RoleTemplateEntity } from "./roletemplate.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RoleTemplateEntity])],
    controllers: [RoletemplateController],
    providers: [RoletemplateService],
})
export class RoletemplateModule {}
