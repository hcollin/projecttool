import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import { Container, Title } from "@mantine/core";

export const Route = createFileRoute('/project/phases')({
  component: PhasesComponent,
})

function PhasesComponent() {
  return (
		<ProjectShell>
			<Container size="xl">
				<Title order={1}>Project Phases</Title>
			</Container>
		</ProjectShell>
	);
}
