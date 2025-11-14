import { createFileRoute } from "@tanstack/react-router";

import { Container } from "@mantine/core";

import ProjectShell from "../../components/ProjectShell/ProjectShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectPriceHourlyPriceGroupsCard from "../../components/ProjectComponents/pricing/ProjectPriceHourlyPriceGroupsCard";

export const Route = createFileRoute("/project/pricing")({
    component: PricingComponent,
});

function PricingComponent() {
    return (
        <ProjectShell>
            <Container size="xl">
                <ProjectPageMainTitle>Pricing</ProjectPageMainTitle>

                <ProjectPriceHourlyPriceGroupsCard />
            </Container>
        </ProjectShell>
    );
}
