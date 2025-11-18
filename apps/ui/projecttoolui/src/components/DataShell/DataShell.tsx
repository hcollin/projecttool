// IMPORT: General Libraries
import { AppShell, Divider, NavLink, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
// import { useSnapshot } from "valtio";

// IMPORT: Custom Components
import MainHeader from "../MainHeader/MainHeader";

// IMPORT: Stores & Actions
// import activeProjectStore from "../../stores/activeproject/activeProjectStore";

// IMPORT: Icons

// IMPORT: Styles
import "./data-shell.css";
import AnchorLink from "../AnchorLink/AnchorLink";

const DataShell = (props: { children: React.ReactNode }) => {
	// const aps = useSnapshot(activeProjectStore);

	return (
		<AppShell
			padding={0}
			layout="alt"
			withBorder={true}
			header={{ height: 80 }}
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
			className="data-shell"
		>
			<AppShell.Header>
				<MainHeader />
			</AppShell.Header>

			<AppShell.Navbar className="project-navbar">
				<AnchorLink to="/" style={{ padding: "0.5rem", marginBottom: "1rem" }}>
					<Title order={1}>Project Tool</Title>
				</AnchorLink>
				<Divider label="Resource data" labelPosition="center" my="sm" />
				<NavLink label="Roles" component={Link} to="/data/roles" />
				<NavLink label="Technologies" component={Link} to="/data/technologies" />
			</AppShell.Navbar>

			<AppShell.Main className="main-content">{props.children}</AppShell.Main>

			<AppShell.Footer>
				<p>&copy; {new Date().getFullYear()} Henrik Collin</p>
			</AppShell.Footer>
		</AppShell>
	);
};

export default DataShell;
