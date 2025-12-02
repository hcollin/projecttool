import { IRoleTemplate } from "@frosttroll/projecttoolmodels";

import { useSnapshot } from "valtio";
import dataRolesStore from "./dataRolesStore";

export const useRoleTemplates = (): IRoleTemplate[] => {
    const store = useSnapshot(dataRolesStore);

    return [...store.roles] as IRoleTemplate[];
};
