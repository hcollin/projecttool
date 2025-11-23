import { ITechnology } from "@frosttroll/projecttoolmodels";
import { Controller, Get, Post, Body, Res } from "@nestjs/common";
import { TechnologyService } from "./technology.service";
import { ApiBody } from "@nestjs/swagger";
import { TechnologyDTO } from "./technology.dto";

@Controller("technology")
export class TechnologyController {
    constructor(private technologyService: TechnologyService) {}

    /**
     * Get all technologies from the technology service.
     * @returns An array of all technologies.
     */
    @Get()
    getAllTechnologies(): ITechnology[] {
        return this.technologyService.getAll();
    }

    /**
     * Create a new technology from the request body.
     * @param tech The technology data from the request body.
     */
    @ApiBody({ type: TechnologyDTO })
    @Post()
    createTechnology(@Body() tech: Partial<TechnologyDTO>, @Res() res): void {
        if (!tech) {
            console.warn("No technology data provided in the request body.");
            res.status(400).send("Technology data is required in the body.");
            return;
        }
        this.technologyService.create(tech);
        res.status(201).send("Technology created successfully.");
    }
}
