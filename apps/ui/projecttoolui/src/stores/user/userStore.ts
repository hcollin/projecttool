import { proxy } from "valtio";

interface IUserStore {
    userId: string;
    organizationId: string;
}

const userStore = proxy<IUserStore>({
    userId: "Unknown User",
    organizationId: "dev-org",
});

export default userStore;