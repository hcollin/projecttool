import { IPhase, IProject, utilCalculatePhasePrice, utilCalulatePhaseDuration } from "@frosttroll/projecttoolmodels";
import { Flex, Box, Text, Title } from "@mantine/core";

interface ProjectPhaseInfoRowProps {
    phase: IPhase;
    project: IProject;
}

const ProjectPhaseInfoRow = (props: ProjectPhaseInfoRowProps) => {
    return (
        <Flex direction="row" justify="space-between" align="center">
            <Box>
                <Title order={3}>{props.phase.name}</Title>
            </Box>
            <Box>
                <Text>{utilCalulatePhaseDuration(props.phase, props.project, true)} work days</Text>
            </Box>
            <Box>
                <Text>
                    {utilCalculatePhasePrice(props.phase, props.project)}{" "}
                    {props.project.prices.hourlypricegroups[0].currency}
                </Text>
            </Box>
        </Flex>
    );
};

export default ProjectPhaseInfoRow;
