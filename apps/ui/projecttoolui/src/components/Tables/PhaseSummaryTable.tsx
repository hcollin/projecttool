import { IProject } from "@frosttroll/projecttoolmodels";
import { calculateTablePhaseSummary } from "./tableUtils";
import { Table } from "@mantine/core";

interface IPhaseSummaryTableProps {
    project: IProject;
}

const PhaseSummaryTable = (props: IPhaseSummaryTableProps) => {
    const data = calculateTablePhaseSummary(props.project);

    return <Table data={data} striped />;
};

export default PhaseSummaryTable;
