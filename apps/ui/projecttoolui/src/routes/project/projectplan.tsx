import { createFileRoute } from "@tanstack/react-router";
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import { Container } from "@mantine/core";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import DocFile from "../../components/Docs/DocFile";
import { EDOCLANG, EDOCTYPE } from "@frosttroll/projecttoolmodels";

export const Route = createFileRoute("/project/projectplan")({
	component: ProjectPlanComponent,
});

function ProjectPlanComponent() {
	return (
		<ProjectShell>
			<Container size="xl">
				<ProjectPageMainTitle className="no-print">Project plan</ProjectPageMainTitle>

				<DocFile type={EDOCTYPE.PROJECTPLAN} lang={EDOCLANG.EN} />
			</Container>
		</ProjectShell>
	);
}
