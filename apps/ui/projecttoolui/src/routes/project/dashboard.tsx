import { Container, Title } from '@mantine/core'
import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";


export const Route = createFileRoute("/project/dashboard")({
	component: ProjectDashboardComponent,
});

export function ProjectDashboardComponent() {
	return (
		<ProjectShell>
			<Container size="xl">
				<Title order={1}>Project Dashboard</Title>
			</Container>
		</ProjectShell>
	);
}
