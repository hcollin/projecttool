import {
    IPhase,
    IProject,
    utilCalculatePhasePrice,
    utilCalculatePhaseDuration,
    utilGetPhaseStartTs,
    utilGetPhaseEndTs,
} from "@frosttroll/projecttoolmodels";
import { Flex, Box, Text, Title, NumberFormatter } from "@mantine/core";
import { DateTime } from "luxon";
import { useMemo } from "react";

interface ProjectPhaseInfoRowProps {
    phase: IPhase;
    project: IProject;
}

const ProjectPhaseInfoRow = (props: ProjectPhaseInfoRowProps) => {
    const phaseDur = useMemo(() => {
        return utilCalculatePhaseDuration(props.phase, props.project, true);
    }, [props.phase, props.project]);

    const phasePrice = useMemo(() => {
        return utilCalculatePhasePrice(props.phase, props.project);
    }, [props.phase, props.project]);

    const phaseStart = useMemo(() => {
        return DateTime.fromMillis(utilGetPhaseStartTs(props.phase, props.project))
            .setLocale("fi")
            .toLocaleString(DateTime.DATE_SHORT);
    }, [props.phase, props.project]);

    const phaseEnd = useMemo(() => {
        return DateTime.fromMillis(utilGetPhaseEndTs(props.phase, props.project))
            .setLocale("fi")
            .toLocaleString(DateTime.DATE_SHORT);
    }, [props.phase, props.project]);

    return (
        <Flex direction="row" justify="space-between" align="center">
            <Box>
                <Title order={3}>{props.phase.name}</Title>
            </Box>
            <Box>
                <Text>{phaseDur} work days</Text>
            </Box>

            <Box>
                <Text>
                    {phaseStart} - {phaseEnd}
                </Text>
            </Box>
            <Box>
                <Text>
                    <NumberFormatter
                        value={phasePrice}
                        suffix={" " + props.project.prices.hourlypricegroups[0].currency}
                        thousandSeparator=" "
                        decimalScale={2}
                        decimalSeparator="."
                    />
                </Text>
            </Box>
        </Flex>
    );
};

export default ProjectPhaseInfoRow;
