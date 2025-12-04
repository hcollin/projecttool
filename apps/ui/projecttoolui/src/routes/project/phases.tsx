// IMPORT: Libraries
import { createFileRoute } from "@tanstack/react-router";
import { Button, Card, Container, Flex } from "@mantine/core";
import { useSnapshot } from "valtio";

// IMPORT: Components
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectPhaseCard from "../../components/ProjectComponents/phases/ProjectPhaseCard";

// IMPORT: Stores and Actions
import activeProjectStore from "../../stores/activeproject/activeProjectStore";

// IMPORT: Common Models, Data and Utils
import { IPhase, IProject } from "@frosttroll/projecttoolmodels";
import { IconPlus, IconSort09 } from "@tabler/icons-react";
import {
    actionAddNewPhaseToActiveProject,
    actionSortPhasesInActiveProjectByStartTime,
} from "../../stores/activeproject/activeProjectActions";
import { useState } from "react";
import ProjectPhaseInfoRow from "../../components/ProjectComponents/phases/ProjectPhaseInfoRow";
import ProjectPhaseBar from "../../components/ProjectPhaseBar/ProjectPhaseBar";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";

export const Route = createFileRoute("/project/phases")({
    component: PhasesComponent,
});

function PhasesComponent() {
    const aps = useSnapshot(activeProjectStore);

    const [editGuid, setEditGuid] = useState<string | null>(null);

    const prj = aps.project;

    function handleCreateNewPhase() {
        actionAddNewPhaseToActiveProject();
    }

    function handleSort() {
        actionSortPhasesInActiveProjectByStartTime();
    }

    if (!prj) {
        return null;
    }

    return (
        <ProjectShell>
            <Container size="xl">
                <ProjectPageMainTitle>Project Phases</ProjectPageMainTitle>

                <ProjectCard>
                    <ProjectPhaseBar />
                </ProjectCard>

                {prj.phases.map((phase) => {
                    if (editGuid !== phase.guid) {
                        return (
                            <Card
                                key={phase.guid}
                                shadow="sm"
                                mb="md"
                                withBorder
                                onClick={() => setEditGuid(phase.guid)}
                            >
                                <ProjectPhaseInfoRow
                                    key={phase.guid}
                                    phase={phase as IPhase}
                                    project={prj as IProject}
                                />
                            </Card>
                        );
                    }
                    return (
                        <ProjectPhaseCard
                            key={phase.guid}
                            phase={phase as IPhase}
                            project={prj as IProject}
                            onClose={() => setEditGuid(null)}
                        />
                    );
                })}

                <Flex justify="flex-end" align="center">
                    <Button variant="filled" size="lg" onClick={handleSort} mr="lg" leftSection={<IconSort09 />}>
                        SORT
                    </Button>
                    <Button variant="filled" size="lg" onClick={handleCreateNewPhase} leftSection={<IconPlus />}>
                        NEW PHASE
                    </Button>
                </Flex>
            </Container>
        </ProjectShell>
    );
}
