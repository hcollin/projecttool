import { Module } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { OrganizationController } from "./organization.controller";
import { OrganizationEntity } from "./organization.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([OrganizationEntity])],
    providers: [OrganizationService],
    controllers: [OrganizationController],
})
export class OrganizationModule {}
