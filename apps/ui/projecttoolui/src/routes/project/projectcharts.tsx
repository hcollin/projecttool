import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import { Container, Title } from "@mantine/core";
import { useSnapshot } from "valtio";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import { uCalculateProjectBudgetSummary } from "../../utils/projectSummaries";
import { IProject } from "common/projecttoolmodels/dist";
import { CompositeChart } from "@mantine/charts";

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

    if (!aps.project) {
        return <div>Please load or create new a project to view the charts.</div>;
    }

    const prj = aps.project as IProject;

    const summary = uCalculateProjectBudgetSummary(prj, "phase");

    console.log("Project Budget Summary:", summary);

    return (
        <>
            <Title order={2}>Budget Chart</Title>
            <ProjectCard>
                <CompositeChart
                    h={400}
                    data={summary}
                    dataKey="key"
                    tickLine="xy"
                    gridAxis="xy"
                    unit="€"
                    valueFormatter={(value: number) => new Intl.NumberFormat("fi-FI").format(value)}
                    series={[
                        { name: "cost", type: "bar", color: "blue", label: "Cost €" },
                        { name: "cumulativeCost", type: "line", color: "red", label: "Cumulative Cost €" },
                    ]}
                />
            </ProjectCard>
        </>
    );
};
