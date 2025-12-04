import {
    IPhase,
    IProject,
    utilCalculatePhasePrice,
    utilCalculatePhaseDuration,
    utilGetPhaseStartTs,
    utilGetPhaseEndTs,
    utilCurrencyToSymbol,
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
            <Box style={{ flex: "0 0 auto", width: "40%" }}>
                <Title order={3}>{props.phase.name}</Title>
            </Box>
            <Box style={{ flex: "0 0 auto", width: "15%" }}>
                <Text ta="center">{phaseDur} work days</Text>
            </Box>

            <Box style={{ flex: "0 0 auto", width: "20%" }}>
                <Text ta="center">
                    {phaseStart} - {phaseEnd}
                </Text>
            </Box>
            <Box style={{ flex: "1 1 auto", textAlign: "right" }}>
                <Text fw="bold" size="lg">
                    <NumberFormatter
                        value={phasePrice}
                        suffix={" " + utilCurrencyToSymbol(props.project.currency)}
                        thousandSeparator=" "
                        decimalScale={2}
                        fixedDecimalScale={true}
                        decimalSeparator="."
                    />
                </Text>
            </Box>
        </Flex>
    );
};

export default ProjectPhaseInfoRow;
