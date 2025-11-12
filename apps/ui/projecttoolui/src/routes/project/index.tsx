import { AppShell } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/project/")({
	component: ProjectRootComponent,
});

function ProjectRootComponent() {
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

			<AppShell.Navbar>
				<div>Project Navigation</div>
			</AppShell.Navbar>

			<AppShell.Main>
				<div>Project Main Content Area</div>
			</AppShell.Main>

			<AppShell.Footer>
				<p>&copy; {new Date().getFullYear()} Henrik Collin</p>
			</AppShell.Footer>
		</AppShell>
	);
}
