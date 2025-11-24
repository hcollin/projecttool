// IMPORT: General libaries
import { createFileRoute } from "@tanstack/react-router";
import { IconFolderOpen, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Box, Button, Container, Flex, Stack, Text } from "@mantine/core";

// IMPORT: Custom components
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import ConfirmButton from "../../components/ConfirmButton/ConfirmButton";

// IMPORT: Stores and actions
import { actionDeleteProjectFromLocalStorage, actionLoadProjectsFromLocalStorage } from "../../stores/generalActions";
import { actionSetActiveProject } from "../../stores/activeproject/activeProjectActions";

// IMPORT: Common models
import { IProject } from "@frosttroll/projecttoolmodels";

export const Route = createFileRoute("/project/listprojects")({
    component: ListProjectsComponent,
});

function ListProjectsComponent() {
    const [projects, setProjects] = useState<IProject[]>(actionLoadProjectsFromLocalStorage());

    function handleLoadProject(project: IProject) {
        actionSetActiveProject(project);
    }

    function handleDeleteProject(projectGuid: string) {
        actionDeleteProjectFromLocalStorage(projectGuid);

        // Load updated projects list
        const storedProjects = actionLoadProjectsFromLocalStorage();
        setProjects(storedProjects);
    }

    return (
        <ProjectShell>
            <Container size="xl">
                <ProjectPageMainTitle>Load Project</ProjectPageMainTitle>

                <ProjectCard>
                    {projects.length === 0 && (
                        <Text size="lg">No projects found from local storage. Please create a new project.</Text>
                    )}

                    <Stack gap="md">
                        {projects.map((project) => (
                            <Flex key={project.guid} align="center" gap="md" justify="space-between">
                                <Text size="lg" style={{ flex: "0 0 auto", width: "25%" }}>
                                    {project.codename}
                                </Text>

                                {project.realname || project.clientName ? (
                                    <Box style={{ textAlign: "left", flex: "1 1 auto" }}>
                                        {project.realname && <Text size="sm">Name: {project.realname}</Text>}
                                        {project.clientName && <Text size="sm">Client: {project.clientName}</Text>}
                                    </Box>
                                ) : null}

                                <Box>
                                    <ConfirmButton
                                        variant="filled"
                                        onClick={() => handleDeleteProject(project.guid)}
                                        color="red"
                                        mr="md"
                                        question="Are you sure you want to delete this project?"
                                    >
                                        <IconTrash />
                                    </ConfirmButton>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleLoadProject(project)}
                                        leftSection={<IconFolderOpen />}
                                    >
                                        Load Project
                                    </Button>
                                </Box>
                            </Flex>
                        ))}
                    </Stack>
                </ProjectCard>
            </Container>
        </ProjectShell>
    );
}
