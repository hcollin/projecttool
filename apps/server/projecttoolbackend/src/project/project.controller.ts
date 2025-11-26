// import { IProject } from "@frosttroll/projecttoolmodels";
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiBody, ApiParam } from "@nestjs/swagger";

import { IProjectBase } from "@frosttroll/projecttoolmodels";
import { ProjectDto } from "./dtos/project.dto";
import { ProjectService } from "./project.service";

@Controller("project")
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}
    /**
     * Return a simplified list of all projects.
     * @returns
     */
    @Get("all")
    async getAllProjects(): Promise<IProjectBase[]> {
        const projects = await this.projectService.getAllProjectsBase();
        return projects;
    }

    @Get(":guid")
    async getProject(@Param("guid") guid: string): Promise<ProjectDto> {
        const prj = await this.projectService.getProjectByGuid(guid);
        if (!prj) {
            throw new BadRequestException(`Project with GUID ${guid} not found.`);
        }
        return prj;
    }

    @ApiBody({ type: ProjectDto })
    @Post()
    async createProject(@Body() project: Partial<ProjectDto>, @Res() res: Response): Promise<ProjectDto> {
        if (!project) {
            const emptyProject = await this.projectService.createEmptyProject();
            res.status(201).send("Empty project created successfully.");
            return Promise.resolve(emptyProject);
        }

        const newProject = await this.projectService.createProject(project);

        res.status(201).send("Project created successfully.");
        return Promise.resolve(newProject);
    }

    @Post("empty")
    async createEmptyProject(): Promise<ProjectDto> {
        const emptyProject = await this.projectService.createEmptyProject();
        // res.status(200).send("Empty project created successfully.");

        return Promise.resolve(emptyProject);
    }

    @ApiBody({ type: ProjectDto })
    @ApiParam({ name: "guid", type: String, description: "The GUID of the project to update." })
    @Post(":guid")
    async updateProject(
        @Param() params: { guid: string },
        @Body() project: ProjectDto,
        // @Res() res: Response,
    ): Promise<ProjectDto> {
        if (!project || !project.guid) {
            throw new BadRequestException("Project data with valid GUID is required for update.");
        }
        if (params.guid !== project.guid) {
            throw new BadRequestException("GUID in URL parameter does not match GUID in project data.");
        }
        const updatedProject = await this.projectService.updateProject(project);
        // res.status(200);
        return Promise.resolve(updatedProject);
    }

    @Delete()
    async deleteProject(@Body("guid") guid: string, @Res() res: Response): Promise<void> {
        if (!guid) {
            throw new BadRequestException("Project GUID is required.");
        }
        await this.projectService.deleteProject(guid);
        res.status(204).send();
    }

    @Delete("role/:guid")
    async deleteRole(@Param("guid") guid: string, @Res() res: Response): Promise<void> {
        if (!guid) {
            throw new BadRequestException("Role GUID is required.");
        }
        await this.projectService.deleteRoleFromProject(guid);
        res.status(204).send();
        // return Promise.resolve();
    }

    @Delete("phase/:guid")
    async deletePhase(@Param("guid") guid: string, @Res() res: Response): Promise<void> {
        if (!guid) {
            throw new BadRequestException("Phase GUID is required.");
        }
        await this.projectService.deletePhaseFromProject(guid);
        res.status(204).send();
    }
}
