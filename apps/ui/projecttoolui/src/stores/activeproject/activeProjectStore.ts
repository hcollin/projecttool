import { IProject } from "common/projecttoolmodels/dist";
import { proxy } from "valtio";

interface IActiveProjectStore {
    project: IProject | null;
    unsavedChanges: boolean;
}

const activeProjectStore = proxy<IActiveProjectStore>({
    project: null,
    unsavedChanges: false,
});

export default activeProjectStore;
