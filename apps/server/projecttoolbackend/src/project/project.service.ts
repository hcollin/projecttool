import { Injectable, Logger } from "@nestjs/common";
import { ProjectEntity } from "./project.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import { ProjectDto } from "./project.dto";
import { CURRENCY } from "@frosttroll/projecttoolmodels/dist/src/index.js";

@Injectable()
export class ProjectService {
    private readonly logger = new Logger(ProjectService.name);

    private projectRepository: Repository<ProjectEntity>;

    constructor(@InjectRepository(ProjectEntity) projectRepository: Repository<ProjectEntity>) {
        this.projectRepository = projectRepository;
        // void this.syncDatabaseWithDefaults().then(() => {
        //     this.databaseSynced = true;
        // });
    }

    private convertEntityToDto(projectEntity: ProjectEntity): ProjectDto {
        const projectDto = new ProjectDto();
        projectDto.guid = projectEntity.guid;
        projectDto.organizationId = projectEntity.organizationGuid;
        projectDto.codename = projectEntity.codename;
        projectDto.realname = projectEntity.realname;
        projectDto.clientName = projectEntity.clientName;
        projectDto.description = projectEntity.description;
        projectDto.start = projectEntity.start;
        projectDto.end = projectEntity.end;
        projectDto.flags = projectEntity.flags;
        projectDto.targetBudget = projectEntity.targetBudget;
        projectDto.currency = projectEntity.currency as CURRENCY;
        projectDto.techStack = {
            frontend: projectEntity.tech_frontend,
            backend: projectEntity.tech_backend,
            data: projectEntity.tech_data,
            platform: projectEntity.tech_platform,
            tools: projectEntity.tech_tools,
        };
        projectDto.prices = {
            hourlypricegroups: projectEntity.hourPriceGroups,
            fixedprices: projectEntity.fixedPrices,
        };
        projectDto.roles = [];
        projectDto.teams = [];
        projectDto.phases = [];
        return projectDto;
    }
}
