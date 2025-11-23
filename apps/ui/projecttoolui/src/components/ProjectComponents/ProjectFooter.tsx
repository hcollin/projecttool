import { Box, Flex, NumberFormatter, Text, Title } from "@mantine/core";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { useSnapshot } from "valtio";
import {
    IProject,
    utilCalculateProjectDurationInDays,
    utilCalculateProjectDurationInWorkDays,
    utilCalculateProjectPrice,
} from "@frosttroll/projecttoolmodels";
import { DateTime } from "luxon";
import { useMemo } from "react";

const ProjectFooter = () => {
    const aps = useSnapshot(activeProjectStore);

    const totalPrice = useMemo(() => {
        if (!aps.project) {
            return 0;
        }
        return utilCalculateProjectPrice(aps.project as IProject);
    }, [aps.project]);
    const prj = aps.project;

    if (!prj) {
        return (
            <Flex>
                <Text>&copy; {new Date().getFullYear()} Henrik Collin</Text>
            </Flex>
        );
    }

    const budgetLeft = prj.targetBudget ? prj.targetBudget - totalPrice : null;

    return (
        <Flex direction="row" align="center" justify="flex-start" px="md" style={{ height: "100%" }} gap="lg">
            <Box>
                <Title order={4}>{prj.codename}</Title>
                <Text size="md">
                    {prj.clientName || "No Client"} : {prj.realname || "No Real Name"}
                </Text>
            </Box>
            <Box>
                <Title order={3}>{utilCalculateProjectDurationInWorkDays(prj as IProject)} work days</Title>

                <Text size="sm">
                    {DateTime.fromMillis(prj.start).setLocale("fi").toLocaleString(DateTime.DATE_SHORT)} -{" "}
                    {DateTime.fromMillis(prj.end).setLocale("fi").toLocaleString(DateTime.DATE_SHORT)}
                    <span style={{ marginLeft: "0.5rem" }}>
                        {utilCalculateProjectDurationInDays(prj as IProject)} days
                    </span>
                </Text>
            </Box>
            <Box>
                <Title order={3}>
                    <NumberFormatter
                        value={totalPrice}
                        decimalScale={2}
                        decimalSeparator="."
                        thousandSeparator=" "
                        suffix={" " + prj.prices.hourlypricegroups[0].currency}
                    />
                </Title>
                {budgetLeft !== null && (
                    <Text size="sm" c={budgetLeft < 0 ? "red.7" : "green.7"}>
                        Budget:{" "}
                        <NumberFormatter
                            value={budgetLeft}
                            decimalScale={2}
                            decimalSeparator="."
                            thousandSeparator=" "
                            suffix={" " + prj.prices.hourlypricegroups[0].currency}
                        />
                    </Text>
                )}
            </Box>
        </Flex>
    );
};
export default ProjectFooter;
