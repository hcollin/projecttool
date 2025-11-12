import { AppShell, NavLink } from "@mantine/core";
import { Link } from "@tanstack/react-router";

const ProjectShell = (props: { children: React.ReactNode }) => {
	return (
		<AppShell
			padding={0}
			layout="default"
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
		>
			<AppShell.Header>
				<h1>Project Tool</h1>
			</AppShell.Header>

			<AppShell.Navbar className="project-navbar">
				<NavLink label="Home" component={Link} to="/project/dashboard" />
				<NavLink label="Settings" component={Link} to="/project/settings" />
                <NavLink label="Pricing" component={Link} to="/project/pricing" />
                <NavLink label="Resources" component={Link} to="/project/resources" />
                <NavLink label="Phases" component={Link} to="/project/phases" />
			</AppShell.Navbar>

			<AppShell.Main className="main-content">{props.children}</AppShell.Main>

			<AppShell.Footer>
				<p>&copy; {new Date().getFullYear()} Henrik Collin</p>
			</AppShell.Footer>
		</AppShell>
	);
};

export default ProjectShell;
