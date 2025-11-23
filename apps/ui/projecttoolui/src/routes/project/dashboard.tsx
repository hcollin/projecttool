import { Button, Container, Grid, Text, Title } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { useSnapshot } from "valtio";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import { IconFolderOpen, IconOctagonPlus } from "@tabler/icons-react";
import { actionCreateNewProject } from "../../stores/generalActions";
import { DateTime } from "luxon";

export const Route = createFileRoute("/project/dashboard")({
	component: ProjectDashboardComponent,
});

export function ProjectDashboardComponent() {
	const aps = useSnapshot(activeProjectStore);

	const prj = aps.project;

	// No active project view
	if (!prj) {
		return <NoActiveProjectView />;
	}

	return (
		<ProjectShell>
			<Container size="xl">
				<Title order={1}>{prj.codename} Dashboard</Title>

				<ProjectCard mt="lg">
					<Grid>
						<Grid.Col span={6}>
							<Text size="lg">{prj.realname || "No real project name yet"}</Text>
							<Text>{prj.clientName || "No client name yet"}</Text>
						</Grid.Col>

						<Grid.Col span={6}>
							<Text>Start: {prj.start ? DateTime.fromMillis(prj.start).setLocale("fi").toLocaleString(DateTime.DATE_SHORT) : "Not set"}</Text>
							<Text>End: {prj.end ? DateTime.fromMillis(prj.end).setLocale("fi").toLocaleString(DateTime.DATE_SHORT) : "Not set"}</Text>
						</Grid.Col>
					</Grid>
				</ProjectCard>
			</Container>
		</ProjectShell>
	);
}

const NoActiveProjectView = () => {
	return (
		<ProjectShell>
			<Container size="xl">
				<Title order={1}>No Active Project</Title>

				<ProjectCard mt="lg">
					<Text>Create a new project to get started.</Text>

					<Button
						variant="contained"
						mt="md"
						onClick={() => {
							actionCreateNewProject();
						}}
						size="xl"
					>
						<IconOctagonPlus style={{ marginRight: "0.5rem" }} />
						Create New Project
					</Button>
				</ProjectCard>

                <ProjectCard mt="lg">
					<Text>Open one of the existing projects from localstorage.</Text>

					<Button
						variant="contained"
						mt="md"
                        component={Link}
						to="/project/listprojects"
						size="xl"
					>
						<IconFolderOpen style={{ marginRight: "0.5rem" }} />
						Open Project
					</Button>
				</ProjectCard>
			</Container>
		</ProjectShell>
	);
};
