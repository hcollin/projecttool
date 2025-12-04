import { IProject, utilRoleDayUtilizationPercentagePerDay } from "@frosttroll/projecttoolmodels";
import { Table } from "@mantine/core";
import { calculateProjectCosts } from "./tableUtils";

interface IRoleSummaryTableProps {
    project: IProject;
    type: "hours" | "cost" | "both";
    showHourlyRate?: boolean;
}

const RoleSummaryTable = (props: IRoleSummaryTableProps) => {
    const data = calculateProjectCosts(props.project, props.type, props.showHourlyRate);
    return <Table data={data} striped />;
};

export default RoleSummaryTable;
