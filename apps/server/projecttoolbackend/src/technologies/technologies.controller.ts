import { Controller, Get } from "@nestjs/common";

// IMPORT: Common Models
import { ITechnology } from "@frosttroll/projecttoolmodels";

// IMPORT: Default Technologies Data
import { DEFAULT_TECHNOLOGIES } from "./default_technologies";

@Controller("technologies")
export class TechnologiesController {
  @Get()
  getAllTechnologies(): ITechnology[] {
    // Logic to retrieve all technologies

    return DEFAULT_TECHNOLOGIES;
  }
}
