import { IRole } from "../..";
import { IRootObject } from "../IRootObject";
export interface ITeam extends IRootObject {
    name: string;
    roles: IRole[];
    description?: string;
}
//# sourceMappingURL=iTeam.d.ts.map