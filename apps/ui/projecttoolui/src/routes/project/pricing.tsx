import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import { Container, Title } from "@mantine/core";

export const Route = createFileRoute("/project/pricing")({
	component: PricingComponent,
});

function PricingComponent() {
	return (
		<ProjectShell>
			<Container size="xl">
				<Title order={1}>Project Pricing</Title>
			</Container>
		</ProjectShell>
	);
}
