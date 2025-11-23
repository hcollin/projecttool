import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import { Button, Container, Flex, Title } from "@mantine/core";
import { useSnapshot } from "valtio";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import {
    IProjectBudgetSummary,
    uCalculateProjectBudgetSummaryGroupByMonth,
    uCalculateProjectBudgetSummaryGroupByPhase,
} from "../../utils/projectSummaries";
import { IProject, utilCurrencyToSymbol } from "@frosttroll/projecttoolmodels";
import { CompositeChart, CompositeChartSeries } from "@mantine/charts";
import { useState } from "react";

export const Route = createFileRoute("/project/projectcharts")({
    component: ProjectChartsComponent,
});

function ProjectChartsComponent() {
    return (
        <ProjectShell>
            <Container size="xl">
                <ProjectPageMainTitle>Project Charts</ProjectPageMainTitle>

                <ProjectBudgetChart />
            </Container>
        </ProjectShell>
    );
}

const ProjectBudgetChart = () => {
    const aps = useSnapshot(activeProjectStore);
    const [type, setType] = useState<"phase" | "month">("month");

    if (!aps.project) {
        return <div>Please load or create new a project to view the charts.</div>;
    }

    const prj = aps.project as IProject;

    if (!prj) {
        return <div>Loading project...</div>;
    }

    let summary: IProjectBudgetSummary[] = [];
    let series: CompositeChartSeries[] = [];
    let barProps = {};

    if (type === "phase") {
        summary = uCalculateProjectBudgetSummaryGroupByPhase(prj);
        series = [
            { name: "cumulativeCost", type: "line", color: "green", label: "Cumulative Cost €" },
            { name: "cost", type: "bar", color: "blue", label: "Cost €" },
        ];
        barProps = {
            type: "default",
        };
    } else {
        summary = uCalculateProjectBudgetSummaryGroupByMonth(prj);
        series = [
            { name: "cumulativeCost", type: "line", color: "green", label: "Cumulative Cost €" },
            { name: "cost", type: "bar", color: "blue", label: "Cost €" },
        ];
        barProps = {
            type: "stacked",
            valueLabelProps: { position: "inside" },
        };
    }

    const refLines = [];

    if (prj.targetBudget && prj.targetBudget > 0) {
        refLines.push({
            y: prj.targetBudget,
            label: `Target Budget ${new Intl.NumberFormat("fi-FI").format(prj.targetBudget)} ${utilCurrencyToSymbol(prj.currency)}`,
            color: "red.7",
            strokeDasharray: "5 5",
            strokeWidth: 2,
            strokeOpacity: 0.7,
        });
    }

    const projectCost = summary.length > 0 ? summary[summary.length - 1].cumulativeCost : 0;

    const maxYValue = Math.max(prj.targetBudget ? prj.targetBudget * 1.1 : 0, projectCost * 1.1);

    return (
        <>
            <Flex justify="space-between" align="center" mb={20}>
                <Title order={3}>Project Budget</Title>
                <Flex gap={10}>
                    <Button
                        variant="filled"
                        color={type === "month" ? "blue.7" : "gray.7"}
                        onClick={() => setType("month")}
                    >
                        Group by Month
                    </Button>
                    <Button
                        variant="filled"
                        color={type === "phase" ? "blue.7" : "gray.7"}
                        onClick={() => setType("phase")}
                    >
                        Group by Phase
                    </Button>
                </Flex>
            </Flex>
            <ProjectCard>
                <CompositeChart
                    h={600}
                    data={summary}
                    dataKey="key"
                    barProps={barProps}
                    gridAxis="xy"
                    gridProps={{ stroke: "#e0e0e0", strokeDasharray: "5 8", yAxisId: "left" }}
                    yAxisProps={{ domain: [0, maxYValue] }}
                    referenceLines={refLines}
                    strokeWidth={3}
                    // withPointLabels
                    withBarValueLabel
                    withLegend
                    unit="€"
                    valueFormatter={(value: number) => new Intl.NumberFormat("fi-FI").format(value)}
                    series={series}
                />
            </ProjectCard>
        </>
    );
};
