import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@mantine/core";

import ProjectShell from "../../components/ProjectShell/ProjectShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectResourceRoleCard from "../../components/ProjectComponents/resources/ProjectResourceRoleCard";

export const Route = createFileRoute("/project/resources")({
	component: ResourcesComponent,
});

function ResourcesComponent() {
	return (
		<ProjectShell>
			<Container size="xl">
				<ProjectPageMainTitle>Project Resources</ProjectPageMainTitle>

				<ProjectResourceRoleCard />
			</Container>
		</ProjectShell>
	);
}
