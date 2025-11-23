import { Controller, Get } from "@nestjs/common";

// IMPORT: Common Models
import { ITechnology } from "@frosttroll/projecttoolmodels";

@Controller("technologies")
export class TechnologiesController {


    @Get()
  getAllTechnologies(): ITechnology[] {
    // Logic to retrieve all technologies

    return [];
  }
}
