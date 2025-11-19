import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import { Button, ButtonGroup, Container, Flex, Table, TableData, Title } from "@mantine/core";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import { useSnapshot } from "valtio";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import {
    CURRENCY,
    IProject,
    ROLESENIORITY,
    utilCalculatePhaseDuration,
    utilCurrencyToSymbol,
} from "@frosttroll/projecttoolmodels";
import { useState } from "react";
import { formatCurrency, formatHours } from "../../utils/formatingUtils";

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

    if (!aps.project) {
        return <div>Please load or create new a project to view the cost summary.</div>;
    }

    const data = calculateProjectCosts({ ...aps.project } as IProject, type);

    return (
        <>
            <Flex gap="md" align="center" mb="sm" justify="space-between">
                <Title order={2}>Summary Table</Title>
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
            </Flex>
            <ProjectCard>
                <Table data={data} />
            </ProjectCard>
        </>
    );
};

function calculateProjectCosts(project: IProject, type: "hours" | "cost" | "both"): TableData {
    const headers: Set<string> = new Set();

    const phaseTotalHours: number[] = [];
    const phaseTotalCosts: number[] = [];
    let currency: CURRENCY = CURRENCY.EUR;
    const data = project.roles.reduce(
        (rows, role) => {
            const row: (string | number | boolean)[] = [];

            // First column is the role name
            headers.add("Role");
            row.push(`${role.seniority !== ROLESENIORITY.MIDLEVEL ? role.seniority + ` ` : ``}${role.name}`);

            // Second column is the price groups hourly rate
            headers.add("Hourly Rate");
            const priceGroup = project.prices.hourlypricegroups.find((hrpg) => hrpg.guid === role.priceGroupId);
            let hourlyrate = 0;
            if (priceGroup) {
                row.push(`${priceGroup.price} ${utilCurrencyToSymbol(project.currency)}`);
                hourlyrate = priceGroup.price;
                currency = project.currency;
            } else {
                row.push("N/A");
            }

            // Next columns are per phase
            let roleTotalHours = 0;
            let roleTotalCost = 0;
            project.phases.forEach((phase, pi) => {
                const alloc = phase.allocations.find((a) => a.roleGuid === role.guid);
                if (alloc && alloc.allocation > 0) {
                    const days = utilCalculatePhaseDuration(phase, project, true);
                    const hours = days * (7.5 * (alloc.allocation / 100));
                    const cost = hours * hourlyrate;
                    roleTotalHours += hours;
                    roleTotalCost += cost;
                    phaseTotalHours[pi] = (phaseTotalHours[pi] || 0) + hours;
                    phaseTotalCosts[pi] = (phaseTotalCosts[pi] || 0) + cost;
                    if (type !== "hours") {
                        headers.add(phase.name + " Cost");
                        row.push(formatCurrency(cost, project.currency || CURRENCY.EUR));
                    }
                    if (type !== "cost") {
                        headers.add(phase.name + " Hours");
                        row.push(formatHours(hours));
                    }
                } else {
                    row.push("-");
                    if (type === "both") {
                        row.push("-");
                    }
                }
            });
            // Final columns are totals

            if (type !== "hours") {
                headers.add("Total Cost");
                row.push(formatCurrency(roleTotalCost, currency));
            }
            if (type !== "cost") {
                headers.add("Total Hours");
                row.push(formatHours(roleTotalHours));
            }

            rows.push(row);

            return rows;
        },
        [] as (string | number | boolean)[][]
    );

    // Calculate phase totals row

    if (type !== "hours") {
        const totalPhaseCostRow: (string | number | boolean)[] = [];
        totalPhaseCostRow.push("Total Cost");
        totalPhaseCostRow.push(" ");
        phaseTotalCosts.forEach((cost) => {
            totalPhaseCostRow.push(formatCurrency(cost, currency));
            if (type === "both") {
                totalPhaseCostRow.push(" ");
            }
        });
        // totalPhaseCostRow.push(...phaseTotalCosts.map((cost) => formatCurrency(cost, currency)));
        data.push(totalPhaseCostRow);

        const total = phaseTotalCosts.reduce((sum, val) => sum + val, 0);
        totalPhaseCostRow.push(formatCurrency(total, currency));
    }

    if (type !== "cost") {
        const totalPhaseHoursRow: (string | number | boolean)[] = [];
        totalPhaseHoursRow.push("Total Hours");
        totalPhaseHoursRow.push(" ");
        phaseTotalHours.forEach((hours) => {
            if (type === "both") {
                totalPhaseHoursRow.push(" ");
            }
            totalPhaseHoursRow.push(formatHours(hours));
        });
        // totalPhaseHoursRow.push(...phaseTotalHours.map((hours) => hours.toFixed(2)));
        data.push(totalPhaseHoursRow);
        const total = phaseTotalHours.reduce((sum, val) => sum + val, 0);
        if (type === "both") {
            totalPhaseHoursRow.push(" ");
        }
        totalPhaseHoursRow.push(formatHours(total));
    }

    // totalRow.push("Total");
    // totalRow.push(""); // Empty cell for hourly rate

    return {
        head: Array.from(headers),
        body: data,
    };
}
