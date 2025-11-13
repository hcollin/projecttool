import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import { Container, Title } from "@mantine/core";

export const Route = createFileRoute("/project/resources")({
	component: ResourcesComponent,
});

function ResourcesComponent() {
	return (
		<ProjectShell>
			<Container size="xl">
				<Title order={1}>Project Resources</Title>
			</Container>
		</ProjectShell>
	);
}
