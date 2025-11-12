import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RootIndexPageComponent,
});

function RootIndexPageComponent() {
	return <div>Hello "/"!</div>;
}
