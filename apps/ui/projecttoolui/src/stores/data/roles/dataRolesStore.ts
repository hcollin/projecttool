import { IRoleTemplate } from "@frosttroll/projecttoolmodels";
import { proxy } from "valtio";

export interface IDataRolesStore {
	roles: IRoleTemplate[];
	lastUpdated?: number;
}
const dataRolesStore = proxy<IDataRolesStore>({
	roles: [],
	lastUpdated: -1,
});
export default dataRolesStore;
