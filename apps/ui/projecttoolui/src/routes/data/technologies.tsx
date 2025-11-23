// IMPORT: Libraries
import { createFileRoute } from "@tanstack/react-router";
import { Container, Flex } from "@mantine/core";
import { useSnapshot } from "valtio";

// IMPORT: Common Models
import { ITechnology } from "@frosttroll/projecttoolmodels";

// IMPORT: Components
import DataShell from "../../components/DataShell/DataShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import TechCard from "../../components/Tech/TechCard";

// IMPORT: Stores and actions
import techStore from "../../stores/data/tech/dataTechStore";
import { actionLoadDataTechnologies } from "../../stores/data/tech/dateTechStoreActions";
import { useEffect } from "react";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";

export const Route = createFileRoute("/data/technologies")({
    component: DataTechnologiesComponent,
});

function DataTechnologiesComponent() {
    const tds = useSnapshot(techStore);

    useEffect(() => {
        actionLoadDataTechnologies();
    }, []);

    return (
        <DataShell>
            <Container size="xl">
                <ProjectPageMainTitle>Data: Technologies</ProjectPageMainTitle>

                <ProjectCard>
                    <Flex align="flex-start" justify="space-between" mb="md" wrap="wrap">
                        {tds.technologies.map((tech) => {
                            return (
                                <TechCard
                                    tech={tech as ITechnology}
                                    key={tech.guid}
                                    style={{ flex: "0 0 auto", width: "30%", height: "9rem" }}
                                />
                            );
                        })}
                    </Flex>
                </ProjectCard>
            </Container>
        </DataShell>
    );
}
