import { ITechnology } from "@frosttroll/projecttoolmodels";
import { proxy } from "valtio";

interface ITechStore {
    technologies: ITechnology[];
    lastUpdated: number;
}

const techStore = proxy<ITechStore>({
    technologies: [],
    lastUpdated: 0,
});

export default techStore;
