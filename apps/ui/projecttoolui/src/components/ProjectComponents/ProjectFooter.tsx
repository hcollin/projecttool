import { Box, Flex, Text, Title } from "@mantine/core";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { useSnapshot } from "valtio";

const ProjectFooter = () => {
	const aps = useSnapshot(activeProjectStore);

	const prj = aps.project;
	if (!prj) {
		return (
			<Flex>
				<Text>&copy; {new Date().getFullYear()} Henrik Collin</Text>
			</Flex>
		);
	}

	return (
		<Flex align="center" justify="space-between" px="md" style={{ height: "100%" }}>
			<Box>
				<Title order={4}>{prj.codename}</Title>
                <Text size="md">{prj.clientName || "No Client"} :  {prj.realname || "No Real Name"}</Text>
			</Box>
		</Flex>
	);
};
export default ProjectFooter;
