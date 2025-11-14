import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import { Container } from "@mantine/core";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";

export const Route = createFileRoute('/project/phases')({
  component: PhasesComponent,
})

function PhasesComponent() {
  return (
		<ProjectShell>
			<Container size="xl">
				<ProjectPageMainTitle>Project Phases</ProjectPageMainTitle>

				
			</Container>
		</ProjectShell>
	);
}
