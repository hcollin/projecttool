import { AppShell } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => {
	return (
		<>
			<AppShell>
				<Outlet />
			</AppShell>
		</>
	);
};

export const Route = createRootRoute({
	component: RootLayout,
});
