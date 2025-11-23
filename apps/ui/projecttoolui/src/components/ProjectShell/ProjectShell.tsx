// IMPORT: General Libraries
import { AppShell, Divider, NavLink, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useSnapshot } from "valtio";

// IMPORT: Common Models
import { IProject } from "@frosttroll/projecttoolmodels";

// IMPORT: Custom Components
import MainHeader from "../MainHeader/MainHeader";
import NavLinkConfirm from "../NavLinkConfirm/NavLinkConfirm";
import ProjectFooter from "../ProjectComponents/ProjectFooter";

// IMPORT: Stores & Actions
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { actionSaveActiveProject } from "../../stores/activeproject/activeProjectActions";
import { actionCreateNewProject, actionStoreProjectToLocalStorage } from "../../stores/generalActions";

// IMPORT: Icons
import {
	IconCalendarMonth,
	IconChartLine,
	IconClockDollar,
	IconDashboard,
	IconDeviceFloppy,
	IconFileReport,
	IconFolderOpen,
	IconOctagonPlus,
	IconPackages,
	IconSettings,
	IconTable,
	IconUsersGroup,
} from "@tabler/icons-react";

// IMPORT: Styles
import "./project-shell.css";
import AnchorLink from "../AnchorLink/AnchorLink";

const ProjectShell = (props: { children: React.ReactNode }) => {
	const aps = useSnapshot(activeProjectStore);

	return (
		<AppShell
			padding={0}
			layout="alt"
			withBorder={true}
			header={{ height: 80 }}
			footer={{ height: 60 }}
			navbar={{
				width: "300px",
				breakpoint: "sm",
				// collapsed: { mobile: !navOpenMobile, desktop: !navOpenMobile },
			}}
			aside={{
				width: 200,
				collapsed: { mobile: true, desktop: true },
				breakpoint: "lg",
			}}
			className="project-shell"
		>
			<AppShell.Header>
				<MainHeader />
			</AppShell.Header>

			<AppShell.Navbar className="project-navbar">
				<AnchorLink to="/" style={{ padding: "0.5rem", marginBottom: "1rem" }}>
					<Title order={1}>Project Tool</Title>
				</AnchorLink>

				<NavLinkConfirm
					label="New Project"
					confirmMessage="Are you sure you want to create a new project?"
					skipConfirmation={aps.unsavedChanges === false}
					onClick={() => {
						actionCreateNewProject();
					}}
					leftSection={<IconOctagonPlus />}
				/>

				<NavLink
					label={`Save Project${aps.project ? ": " + aps.project.codename : ""}`}
					disabled={!aps.unsavedChanges}
					leftSection={<IconDeviceFloppy />}
					onClick={() => {
						if (!aps.project) {
							return;
						}
						actionStoreProjectToLocalStorage(aps.project as IProject);
						actionSaveActiveProject();
					}}
				/>

				<NavLink label="Load Project" leftSection={<IconFolderOpen />} component={Link} to="/project/listprojects" />

				<Divider label={aps.project ? aps.project.codename : "No Active Project"} labelPosition="center" my="sm" />
				<NavLink label={"Dashboard"} component={Link} to="/project/dashboard" disabled={!aps.project} leftSection={<IconDashboard />} />
				<NavLink label="Settings" component={Link} to="/project/settings" disabled={!aps.project} leftSection={<IconSettings />} />

				<Divider label="Project Management" labelPosition="center" my="sm" />
				<NavLink label="Phases" component={Link} to="/project/phases" disabled={!aps.project} leftSection={<IconCalendarMonth />} />
				<NavLink label="Pricing" component={Link} to="/project/pricing" disabled={!aps.project} leftSection={<IconClockDollar />} />
				<NavLink label="Resources" component={Link} to="/project/resources" disabled={!aps.project} leftSection={<IconUsersGroup />} />
				<NavLink label="Project Plan" component={Link} to="/project/projectplan" disabled={!aps.project} leftSection={<IconFileReport />} />

				<Divider label="Solution" labelPosition="center" my="sm" />
				<NavLink label="Technology Stack" component={Link} to="/project/techstack" disabled={!aps.project} leftSection={<IconPackages />} />

				<Divider label="Summaries" labelPosition="center" my="sm" />
				<NavLink label="Summary Tables" component={Link} to="/project/summarytable" disabled={!aps.project} leftSection={<IconTable />} />
				<NavLink label="Project Charts" component={Link} to="/project/projectcharts" disabled={!aps.project} leftSection={<IconChartLine />} />

			</AppShell.Navbar>

			<AppShell.Main className="main-content">{props.children}</AppShell.Main>

			<AppShell.Footer>
				<ProjectFooter />
			</AppShell.Footer>
		</AppShell>
	);
};

export default ProjectShell;
