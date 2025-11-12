import { IRootObject } from "../IRootObject";

export interface ITeam extends IRootObject {
	name: string;

	// List of person IDs who are members of this team (references to IPerson.guid)
	memberIds: string[];
}
