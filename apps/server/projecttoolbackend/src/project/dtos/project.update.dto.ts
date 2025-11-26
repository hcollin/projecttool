import { ProjectDto } from "./project.dto";
import { RoleUpdateDto } from "./role.update.dto";
import { PhaseUpdateDto } from "./phase.update.dto";

export type ProjectUpdateDto = Omit<Partial<ProjectDto>, "roles" | "phases"> & {
    roles?: RoleUpdateDto[];
    phases?: PhaseUpdateDto[];
};
