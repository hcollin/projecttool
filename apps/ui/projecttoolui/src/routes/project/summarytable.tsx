import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import { Button, ButtonGroup, Container, Flex, Group, Switch, Tabs, Title } from "@mantine/core";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import { useSnapshot } from "valtio";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { IProject, IRole } from "@frosttroll/projecttoolmodels";
import { useState } from "react";
import RoleSummaryTable from "../../components/Tables/RoleSummaryTable";
import PhaseSummaryTable from "../../components/Tables/PhaseSummaryTable";
import RoleUtilizationChart from "../../components/Charts/RoleUtilizationChart";

export const Route = createFileRoute("/project/summarytable")({
    component: SummaryTableComponent,
});

function SummaryTableComponent() {
    return (
        <ProjectShell>
            <Container size="xl">
                <ProjectPageMainTitle>Summary Tables</ProjectPageMainTitle>

                <ProjectCostSummary />
            </Container>
        </ProjectShell>
    );
}

const ProjectCostSummary = () => {
    const aps = useSnapshot(activeProjectStore);

    const [type, setType] = useState<"hours" | "cost" | "both">("cost");

    const [showRateColumn, setShowRateColumn] = useState<boolean>(true);

    if (!aps.project) {
        return <div>Please load or create new a project to view the cost summary.</div>;
    }

    return (
        <Tabs defaultValue="role-summary">
            <Tabs.List mb="md">
                <Tabs.Tab value="role-summary">Role Summary Table</Tabs.Tab>
                <Tabs.Tab value="phase-summary">Phase Summary Table</Tabs.Tab>
                <Tabs.Tab value="resource-utilization">Role Utilization</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="role-summary">
                <Flex gap="md" align="center" mb="sm" justify="space-between">
                    <Title order={2}>Role Summary Table</Title>
                    <Group gap="md">
                        <Switch
                            label="Hourly Rate Column"
                            labelPosition="left"
                            checked={showRateColumn}
                            onChange={(event) => setShowRateColumn(event.currentTarget.checked)}
                        />
                        <ButtonGroup>
                            <Button
                                variant="filled"
                                color={type === "hours" ? "blue.7" : "gray.7"}
                                onClick={() => setType("hours")}
                            >
                                Hours
                            </Button>
                            <Button
                                variant="filled"
                                color={type === "cost" ? "blue.7" : "gray.7"}
                                onClick={() => setType("cost")}
                            >
                                Cost
                            </Button>
                            <Button
                                variant="filled"
                                color={type === "both" ? "blue.7" : "gray.7"}
                                onClick={() => setType("both")}
                            >
                                Both
                            </Button>
                        </ButtonGroup>
                    </Group>
                </Flex>
                <ProjectCard>
                    <RoleSummaryTable project={aps.project as IProject} type={type} showHourlyRate={showRateColumn} />
                </ProjectCard>
            </Tabs.Panel>

            <Tabs.Panel value="phase-summary">
                <Title order={2} mt="lg" mb="sm">
                    Phase Summary Table
                </Title>

                <ProjectCard>
                    <PhaseSummaryTable project={aps.project as IProject} />
                </ProjectCard>
            </Tabs.Panel>

            <Tabs.Panel value="resource-utilization">
                <Title order={2} mt="lg" mb="sm">
                    Role Utilization Chart
                </Title>

                <ProjectCard>
                    {aps.project.roles.map((role) => (
                        <Flex>
                            <Title order={4} mb="sm" flex="0 0 auto" style={{ width: "25%" }}>
                                {role.name}
                            </Title>
                            <RoleUtilizationChart
                                key={role.guid}
                                role={role as IRole}
                                project={aps.project as IProject}
                            />
                        </Flex>
                    ))}
                </ProjectCard>
            </Tabs.Panel>
        </Tabs>
    );
};
