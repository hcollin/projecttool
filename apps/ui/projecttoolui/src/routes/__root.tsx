import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { actionInitializeDataStores } from "../stores/data/dataActions";
import { Loader } from "@mantine/core";

const RootLayout = () => {
	const ready = useInitializeStores();

	if (!ready) {
		return <Loader size="xl" variant="dots" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />;
	}

	return (
		<>
			<Outlet />
		</>
	);
};

export const Route = createRootRoute({
	component: RootLayout,
});

function useInitializeStores(): boolean | Error {
	const [done, setDone] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [inProgress, setInProgress] = useState<boolean>(false);

	useEffect(() => {
		async function initialize() {
			setInProgress(true);
			try {
				await actionInitializeDataStores();
				setInProgress(false);
				setDone(true);
			} catch (err) {
				setError(err as Error);
				setInProgress(false);
				setDone(false);
			}
		}

		initialize();
	}, []);

	return done === true ? true : inProgress === true ? false : error !== null ? error : false;
}
