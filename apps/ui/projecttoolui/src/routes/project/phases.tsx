// IMPORT: Libraries
import { createFileRoute } from "@tanstack/react-router";
import { Button, Container, Flex } from "@mantine/core";
import { useSnapshot } from "valtio";

// IMPORT: Components
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectPhaseCard from "../../components/ProjectComponents/phases/ProjectPhaseCard";

// IMPORT: Stores and Actions
import activeProjectStore from "../../stores/activeproject/activeProjectStore";

// IMPORT: Common Models, Data and Utils
import { IPhase, IProject } from "@frosttroll/projecttoolmodels";
import { IconPlus } from "@tabler/icons-react";
import { actionAddNewPhaseToActiveProject } from "../../stores/activeproject/activeProjectActions";

export const Route = createFileRoute("/project/phases")({
    component: PhasesComponent,
});

function PhasesComponent() {
    const aps = useSnapshot(activeProjectStore);

    const prj = aps.project;

    function handleCreateNewPhase() {
        actionAddNewPhaseToActiveProject();
    }

    if (!prj) {
        return null;
    }

    return (
        <ProjectShell>
            <Container size="xl">
                <ProjectPageMainTitle>Project Phases</ProjectPageMainTitle>

                {prj.phases.map((phase) => (
                    <ProjectPhaseCard key={phase.guid} phase={phase as IPhase} project={prj as IProject} />
                ))}

                <Flex justify="flex-end" align="center">
                    <Button variant="filled" size="lg" onClick={handleCreateNewPhase}>
                        <IconPlus mr="sm" /> NEW PHASE
                    </Button>
                </Flex>
            </Container>
        </ProjectShell>
    );
}
