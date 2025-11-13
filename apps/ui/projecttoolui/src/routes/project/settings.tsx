import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import { ActionIcon, Button, Container, Flex, TextInput, Title } from "@mantine/core";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import { useSnapshot } from "valtio";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { useState } from "react";
import { actionUpdateActiveProject } from "../../stores/activeproject/activeProjectActions";
import { IProject } from "common/projecttoolmodels/dist";
import { IconDice6Filled } from "@tabler/icons-react";
import { generateRandomProjectName } from "@frosttroll/projecttoolutils";

export const Route = createFileRoute("/project/settings")({
	component: ProjectSettingsComponent,
});

function ProjectSettingsComponent() {
	const aps = useSnapshot(activeProjectStore);

	const [codename, setCodename] = useState(aps.project?.codename || "");
	const [realname, setRealname] = useState(aps.project?.realname || "");
	const [clientName, setClientName] = useState(aps.project?.clientName || "");

	const handleSaveChanges = () => {
		const np: IProject = { ...(aps.project as IProject), codename: codename };
		if (realname.length > 0) {
			np.realname = realname;
		}
		if (clientName.length > 0) {
			np.clientName = clientName;
		}
		actionUpdateActiveProject(np);
	};

	const handleReset = () => {
		setCodename(aps.project?.codename || "");
		setRealname(aps.project?.realname || "");
		setClientName(aps.project?.clientName || "");
	};

	return (
		<ProjectShell>
			<Container size="xl" className="project-shell-container">
				<ProjectPageMainTitle>Project Settings</ProjectPageMainTitle>

				<Title order={2}>General Project Information</Title>
				<ProjectCard>
					<Flex align="center" justify="space-between" mb="lg" gap="md">
						<TextInput
							style={{ flex: "1 1 auto" }}
							size="lg"
							radius="xs"
							label="Project Codename"
							description="Internal project code name used for identification."
							mb="lg"
							value={codename}
							onChange={(e) => setCodename(e.target.value)}
						/>

						<ActionIcon
							variant="filled"
							size="xl"
							style={{ flex: "0 0 auto", marginLeft: "2rem" }}
							onClick={() => {
								setCodename(generateRandomProjectName());
							}}
						>
							<IconDice6Filled />
						</ActionIcon>
					</Flex>

					<TextInput
						size="lg"
						radius="xs"
						label="Real Project Name"
						description="The official real name of the project."
						mb="lg"
						value={realname}
						onChange={(e) => setRealname(e.target.value)}
					/>

					<TextInput
						size="lg"
						radius="xs"
						label="Client Name"
						description="Name of the client for whom the project is being done."
						mb="lg"
						value={clientName}
						onChange={(e) => setClientName(e.target.value)}
					/>
				</ProjectCard>

				<ProjectCard mt="lg">
					<Flex justify="flex-end" align="center">
						<Button variant="default" color="gray" mr="md" onClick={handleReset}>
							Reset
						</Button>
						<Button variant="filled" color="blue" mr="md" onClick={handleSaveChanges}>
							Save Changes
						</Button>
					</Flex>
				</ProjectCard>
			</Container>
		</ProjectShell>
	);
}
