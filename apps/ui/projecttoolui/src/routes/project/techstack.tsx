// IMPORT: General libraries
import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Container, Title } from "@mantine/core";

// IMPORT: Project components
import ProjectShell from "../../components/ProjectShell/ProjectShell";

// IMPORT: Stores and actions

// IMPORT: Common models
import { ETECHAPPLICATIONLAYER } from "@frosttroll/projecttoolmodels";
import { actionLoadDataTechnologies } from "../../stores/data/tech/dateTechStoreActions";
import ProjectTechCard from "../../components/ProjectComponents/tech/ProjectTechCard";

export const Route = createFileRoute("/project/techstack")({
    component: ProjectTechStackComponent,
});

function ProjectTechStackComponent() {
    useEffect(() => {
        actionLoadDataTechnologies();
    }, []);

    return (
        <ProjectShell>
            <Container size="xl">
                <Title order={1} mb="lg">
                    Project Technology
                </Title>

                <ProjectTechCard title="Frontend" appLayers={[ETECHAPPLICATIONLAYER.FRONTEND]} target="frontend" />
                <ProjectTechCard title="Backend" appLayers={[ETECHAPPLICATIONLAYER.BACKEND]} target="backend" />
                <ProjectTechCard title="Data" appLayers={[ETECHAPPLICATIONLAYER.DATABASE]} target="data" />
                <ProjectTechCard
                    title="Platform"
                    appLayers={[ETECHAPPLICATIONLAYER.INFRA, ETECHAPPLICATIONLAYER.NETWORK]}
                    target="platform"
                />
                <ProjectTechCard
                    title="Tools"
                    appLayers={[ETECHAPPLICATIONLAYER.OTHER, ETECHAPPLICATIONLAYER.NONE]}
                    target="tools"
                />
            </Container>
        </ProjectShell>
    );
}
