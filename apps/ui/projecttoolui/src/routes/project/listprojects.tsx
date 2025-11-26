// IMPORT: General libaries
import { createFileRoute } from "@tanstack/react-router";
import { IconFolderOpen, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Box, Button, Container, Flex, Stack, Text, Title } from "@mantine/core";

// IMPORT: Custom components
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import ConfirmButton from "../../components/ConfirmButton/ConfirmButton";

// IMPORT: Stores and actions
import { actionDeleteProjectFromLocalStorage, actionLoadProjectsFromLocalStorage } from "../../stores/generalActions";
import { actionSetActiveProject } from "../../stores/activeproject/activeProjectActions";

// IMPORT: Common models
import { IProject, IProjectBase } from "@frosttroll/projecttoolmodels";
import { useProjectsSimple } from "../../api/project/projectHooks";
import Loading from "../../components/Saving/Loading";

export const Route = createFileRoute("/project/listprojects")({
    component: ListProjectsComponent,
});

function ListProjectsComponent() {
    const [projects, setProjects] = useState<IProject[]>(actionLoadProjectsFromLocalStorage());
    const [dbprjs, dbLoading] = useProjectsSimple();

    function handleLoadProject(guid: string) {
        const prj = projects.find((p) => p.guid === guid);
        if (prj) {
            actionSetActiveProject(prj);
        }
    }

    function handleLoadProjectFromDb(projectGuid: string) {
        const project = dbprjs.find((p) => p.guid === projectGuid);
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

                    <Title order={2} mb="md">
                        Projects in localstorage
                    </Title>
                    <Stack gap="md">
                        {projects.map((project) => (
                            <ProjectItem
                                key={project.guid}
                                project={project}
                                onDelete={handleDeleteProject}
                                onLoad={handleLoadProject}
                            />
                        ))}
                    </Stack>

                    <Title order={2} mt="xl" mb="md">
                        Projects in database
                    </Title>
                    {dbLoading && <Loading />}
                    <Stack gap="md">
                        {dbprjs.map((project) => (
                            <ProjectItem
                                key={project.guid}
                                project={project}
                                onDelete={handleDeleteProject}
                                onLoad={handleLoadProject}
                            />
                        ))}
                    </Stack>
                </ProjectCard>
            </Container>
        </ProjectShell>
    );
}

const ProjectItem = (props: {
    project: IProjectBase;
    onDelete: (guid: string) => void;
    onLoad: (guid: string) => void;
}) => {
    const { project, onDelete, onLoad } = props;

    return (
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
                    onClick={() => onDelete(project.guid)}
                    color="red"
                    mr="md"
                    question="Are you sure you want to delete this project?"
                >
                    <IconTrash />
                </ConfirmButton>
                <Button variant="contained" onClick={() => onLoad(project.guid)} leftSection={<IconFolderOpen />}>
                    Load Project
                </Button>
            </Box>
        </Flex>
    );
};
