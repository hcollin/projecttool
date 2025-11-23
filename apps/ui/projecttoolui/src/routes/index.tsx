import { Card, Container, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import AnchorLink from "../components/AnchorLink/AnchorLink";

export const Route = createFileRoute("/")({
	component: RootIndexPageComponent,
});

function RootIndexPageComponent() {
	return (
        <Container size="xl" pt="xl">
            <Title order={1} mb="md">Project Tool</Title>


            <Card>
                <AnchorLink to="/project/dashboard">Go to project dashboard here.</AnchorLink>
            </Card>

        </Container>
    );
}
