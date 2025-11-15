import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import { Box, Button, Container, Flex, Stack, Text } from "@mantine/core";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import { IProject } from "@frosttroll/projecttoolmodels";
import { useEffect, useState } from "react";
import { actionLoadProjectsFromLocalStorage } from "../../stores/generalActions";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import { actionSetActiveProject } from "../../stores/activeproject/activeProjectActions";
import { IconFolderOpen } from "@tabler/icons-react";

export const Route = createFileRoute("/project/listprojects")({
	component: ListProjectsComponent,
});

function ListProjectsComponent() {
	const [projects, setProjects] = useState<IProject[]>([]);

	useEffect(() => {
		// Load projects from local storage
		const storedProjects = actionLoadProjectsFromLocalStorage();
		setProjects(storedProjects);

		console.log("Loaded projects from local storage:", storedProjects);
	}, []);

	function handleLoadProject(project: IProject) {
		actionSetActiveProject(project);
	}

	return (
		<ProjectShell>
			<Container size="xl">
				<ProjectPageMainTitle>Load Project</ProjectPageMainTitle>

				<ProjectCard>
					{projects.length === 0 && <Text size="lg">No projects found from local storage. Please create a new project.</Text>}

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
									<Button variant="contained" onClick={() => handleLoadProject(project)} leftSection={<IconFolderOpen />}>
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
