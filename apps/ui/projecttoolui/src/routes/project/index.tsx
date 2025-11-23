import { redirect, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/project/")({

	beforeLoad: () => {
		throw redirect({ to: "/project/dashboard" });
	},
});
