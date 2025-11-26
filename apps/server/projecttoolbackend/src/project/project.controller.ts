// import { IProject } from "@frosttroll/projecttoolmodels";
import { BadRequestException, Body, Controller, Get, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiBody } from "@nestjs/swagger";

import { IProjectBase } from "@frosttroll/projecttoolmodels";
import { ProjectDto } from "./project.dto";
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

    @ApiBody({ type: ProjectDto })
    @Post()
    async createProject(@Body() project: Partial<ProjectDto>, @Res() res: Response): Promise<void> {
        if (!project) {
            throw new BadRequestException("Project data is required in the body.");
        }

        await this.projectService.createProject(project);

        res.status(201).send("Project created successfully.");
        return Promise.resolve();
    }
}
