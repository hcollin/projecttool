// Ensure the correct path and export for ITechnology; adjust if necessary
import type { ITechnology } from "@frosttroll/projecttoolmodels";
import { Controller, Get, Post, Body, Res, Param } from "@nestjs/common";
import { TechnologyService } from "./technology.service";
import { ApiBody, ApiParam } from "@nestjs/swagger";
import { TechnologyDTO } from "./technology.dto";
import type { Response } from "express";

@Controller("technology")
export class TechnologyController {
    constructor(private technologyService: TechnologyService) {}

    /**
     * Get all technologies from the technology service.
     * @returns An array of all technologies.
     */
    @Get()
    async getAllTechnologies(): Promise<ITechnology[]> {
        return await this.technologyService.getAll();
    }

    /**
     * Get technology by GUID
     */
    @Get(":guid")
    @ApiParam({ name: "guid", type: String, description: "The GUID of the technology to retrieve." })
    async getTechnologyByGuid(@Param() params: { guid: string }, @Res() res: Response): Promise<ITechnology> {
        const { guid } = params;
        if (!guid) {
            res.status(400).send("GUID parameter is required.");
            return Promise.resolve();
        }
        const tech = await this.technologyService.getByGuid(guid);
        if (!tech) {
            res.status(404).send(`Technology with GUID ${guid} not found.`);
            return;
        }
        res.status(200).json(tech);
    }

    /**
     * Create a new technology from the request body.
     * @param tech The technology data from the request body.
     */
    @ApiBody({ type: TechnologyDTO })
    @Post()
    async createTechnology(@Body() tech: Partial<TechnologyDTO>, @Res() res: Response): Promise<void> {
        if (!tech) {
            console.warn("No technology data provided in the request body.");
            res.status(400).send("Technology data is required in the body.");
            return Promise.resolve();
        }
        await this.technologyService.create(tech);
        res.status(201).send("Technology created successfully.");
        return Promise.resolve();
    }

    /**
     * Create a new technology from the request body.
     * @param tech The technology data from the request body.
     */
    @ApiBody({ type: TechnologyDTO })
    @ApiParam({ name: "guid", type: String, description: "The GUID of the technology to retrieve." })
    @Post("/:guid")
    async updateTechnology(
        @Param() params: { guid: string },
        @Body() tech: TechnologyDTO,
        @Res() res: Response,
    ): Promise<void> {
        if (!tech) {
            console.warn("No technology data provided in the request body.");
            res.status(400).send("Technology data is required in the body.");
            return Promise.resolve();
        }
        if (tech.guid !== params.guid) {
            res.status(400).send("Technology GUID in the body does not match the GUID in the URL.");
            return Promise.resolve();
        }
        await this.technologyService.update(tech);
        res.status(201).send("Technology updated successfully.");
        return Promise.resolve();
    }
}
