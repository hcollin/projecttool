import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { ProjectEntity } from "./entities/project.entity";
import { PhaseEntity } from "./entities/phase.entity";
import { RoleEntity } from "./entities/role.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, PhaseEntity, RoleEntity])],
    providers: [ProjectService],
    controllers: [ProjectController],
})
export class ProjectModule {}
