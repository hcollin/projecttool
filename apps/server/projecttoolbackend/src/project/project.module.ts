import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { ProjectEntity } from "./project.entity";
import { PhaseEntity } from "./phase.entity";
import { RoleEntity } from "./role.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, PhaseEntity, RoleEntity])],
    providers: [ProjectService],
    controllers: [ProjectController],
})
export class ProjectModule {}
