import { createFileRoute } from "@tanstack/react-router";
import DataShell from "../../components/DataShell/DataShell";
import { Box, Card, Container, Flex, Group, Title } from "@mantine/core";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import { useSnapshot } from "valtio";
import techStore from "../../stores/data/tech/dataTechStore";
import dataRolesStore from "../../stores/data/roles/dataRolesStore";

import { BarChart, DonutChart } from "@mantine/charts";

import { useEffect } from "react";
import { actionLoadDataRoleTemplates } from "../../stores/data/roles/dataRolesActions";
import { actionLoadDataTechnologies } from "../../stores/data/tech/dateTechStoreActions";
import CustomLegend from "../../components/Charts/CustomLegend";

export const Route = createFileRoute("/data/")({
    component: DataIndexComponent,
});

const COLORS: string[] = [
    "blue.6",
    "red.6",
    "green.6",
    "yellow.6",
    "orange.6",
    "indigo.6",
    "teal.6",
    "pink.6",
    "cyan.6",
    "lime.6",
];

function DataIndexComponent() {
    const drs = useSnapshot(dataRolesStore);
    const tds = useSnapshot(techStore);

    useEffect(() => {
        actionLoadDataRoleTemplates();
        actionLoadDataTechnologies();
    }, []);

    const techCategories = tds.technologies.reduce(
        (acc, tech) => {
            const category = tech.category[0] || "Uncategorized";
            const existing = acc.find((a) => a.name === category);
            if (existing) {
                existing.value += 1;
            } else {
                acc.push({ name: category, value: 1, color: COLORS[acc.length % COLORS.length] });
            }
            return acc;
        },
        [] as { name: string; value: number; color: string }[]
    );

    const techLayers = tds.technologies.reduce(
        (acc, tech) => {
            tech.appLayer.forEach((layer) => {
                const existing = acc.find((a) => a.name === layer);
                if (existing) {
                    existing.value += 1;
                } else {
                    acc.push({ name: layer, value: 1, color: COLORS[acc.length % COLORS.length] });
                }
            });
            return acc;
        },
        [] as { name: string; value: number; color: string }[]
    );

    const rolesByGroup = drs.roles.reduce(
        (acc, role) => {
            if (role.groups.length === 0) {
                const existing = acc.find((a) => a.name === "Others");
                if (existing) {
                    existing.value += 1;
                } else {
                    acc.push({ name: "Others", value: 1, color: COLORS[acc.length % COLORS.length] });
                }
                return acc;
            }
            role.groups.forEach((group) => {
                const existing = acc.find((a) => a.name === group);
                if (existing) {
                    existing.value += 1;
                } else {
                    acc.push({ name: group, value: 1, color: COLORS[acc.length % COLORS.length] });
                }
            });
            return acc;
        },
        [] as { name: string; value: number; color: string }[]
    );

    const totals = [
        { name: "Technologies", value: tds.technologies.length, color: "blue.7" },
        { name: "Role templates", value: drs.roles.length, color: "pink.7" },
    ];

    return (
        <DataShell>
            <Container size="xl">
                <ProjectPageMainTitle>Data</ProjectPageMainTitle>

                <Title order={3}>Data Totals</Title>
                <Card p="lg" mb="lg" style={{ overflow: "visible", height: "200px" }}>
                    <BarChart
                        h={200}
                        data={totals}
                        dataKey="name"
                        series={[{ name: "value", color: "blue.7", label: "Total" }]}
                        withBarValueLabel
                        orientation="vertical"
                        yAxisProps={{ width: 120 }}
                        valueFormatter={(value: number) => new Intl.NumberFormat("fi-FI").format(value)}
                        gridProps={{ stroke: "#e0e0e0", strokeDasharray: "4 4", yAxisId: "left" }}
                        gridAxis="y"
                        withTooltip={false}
                        barLabelColor="white"
                    />
                </Card>

                <Title order={3}>Technologies</Title>
                <Group align="center" mb="lg" justify="space-between">
                    <Card style={{width: "49%"}}>
                        <Flex align="center" gap="xs" justify="space-around">
                            <DonutChart
                                data={techCategories}
                                withLabels
                                withLabelsLine
                                chartLabel="Technologies by Category"
                                size={300}
                                thickness={30}
                                withTooltip
                                labelColor="white"
                            />

                            <CustomLegend
                                payload={techCategories}
                                nameKey="name"
                                colorKey="color"
                                size="sm"
                                direction="column"
                                align="default"
                            />
                        </Flex>
                    </Card>

                    <Card style={{width: "49%"}}>
                        <Flex align="center" gap="xs" justify="space-around">
                            <DonutChart
                                data={techLayers}
                                withLabels
                                withLabelsLine
                                chartLabel="Technologies by Application Layer"
                                size={300}
                                thickness={30}
                                labelColor="white"
                            />

                            <CustomLegend
                                payload={techLayers}
                                nameKey="name"
                                colorKey="color"
                                size="sm"
                                direction="column"
                                align="default"
                            />
                        </Flex>
                    </Card>
                </Group>
                <Title order={3}>Role Templates</Title>
                <Group>
                    <Card style={{width: "100%"}}>
                        <Flex align="center" justify="center" gap="xs" style={{width: "100%"}}>
                            <Box style={{ width: "60%", height: "350px", overflow: "visible" }} p="md">
                                <BarChart
                                    h={330}
                                    gridProps={{ stroke: "#e0e0e0", strokeDasharray: "5 8", yAxisId: "left" }}
                                    gridAxis="x"
                                    withBarValueLabel
                                    valueFormatter={(value: number) => new Intl.NumberFormat("fi-FI").format(value)}
                                    data={rolesByGroup}
                                    dataKey="name"
                                    barLabelColor="white"
                                    series={[{ name: "value", color: "blue.7", label: "Total" }]}
                                    withYAxis={false}
                                />
                            </Box>
                        </Flex>
                    </Card>
                </Group>
            </Container>
        </DataShell>
    );
}
