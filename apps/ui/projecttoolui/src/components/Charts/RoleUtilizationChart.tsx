import { IProject, IRole, utilRoleDayUtilizationPercentagePerDay } from "@frosttroll/projecttoolmodels";
import { Heatmap } from "@mantine/charts";
import dayjs from "dayjs";
import { DateTime } from "luxon";

import "./heatmap.css";

interface IRoleUtilizationChartProps {
    role: IRole;
    project: IProject;
}

const RoleUtilizationChart = (props: IRoleUtilizationChartProps) => {
    const { role, project } = props;
    console.log(project.holidays);
    const utilization = utilRoleDayUtilizationPercentagePerDay(role.guid, project);

    const heatmapData = Array.from(utilization.entries()).reduce(
        (acc, [date, percent]) => {
            const d = DateTime.fromISO(date);

            if (isNonWorkingDay(d, project)) {
                return acc;
            }

            const dateKey = `${d.toFormat("yyyy-MM-dd")}`;

            acc[dateKey] = percent;
            return acc;
        },
        {} as Record<string, number>
    );

    const projectStartDate = DateTime.fromMillis(project.start).startOf("day").toFormat("yyyy-MM-dd");
    const projectEndDate = DateTime.fromMillis(project.end).endOf("day").toFormat("yyyy-MM-dd");

    const heatMapColors = [
        "var(--heatmap-color-0)",
        "var(--heatmap-color-1)",
        "var(--heatmap-color-2)",
        "var(--heatmap-color-3)",
        "var(--heatmap-color-4)",
        "var(--heatmap-color-5)",
        "var(--heatmap-color-6)",
        "var(--heatmap-color-7)",
        "var(--heatmap-color-8)",
        "var(--heatmap-color-9)",
        "var(--heatmap-color-10)",
    ];

    return (
        <Heatmap
            className="heatmap-chart"
            data={heatmapData}
            radius={4}
            gap={2}
            withTooltip
            withMonthLabels
            startDate={projectStartDate}
            endDate={projectEndDate}
            domain={[0, 200]}
            colors={heatMapColors}
            getTooltipLabel={({ date, value }) =>
                `${dayjs(date).format("DD MMM, YYYY")} – ${value === null || value === 0 ? "No allocations" : `${value}${value > 1 ? "%" : ""}`}`
            }
        />
    );
};

export default RoleUtilizationChart;

function isNonWorkingDay(date: DateTime, prj: IProject): boolean {
    // Check weekends
    if (date.weekday === 6 || date.weekday === 7) {
        return true;
    }

    return false;
}
