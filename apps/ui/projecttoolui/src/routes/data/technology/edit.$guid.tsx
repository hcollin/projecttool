// IMPORT: General libraries
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert } from "@mantine/core";

// IMPORT: Common models
import { ITechnology } from "@frosttroll/projecttoolmodels";

// IMPORT: Stores & Actions
import { actionGetDataTechnologyById, actionUpdateDataTechnology } from "../../../stores/data/tech/dateTechStoreActions";

// IMPORT: Components
import DataShell from "../../../components/DataShell/DataShell";
import ProjectPageMainTitle from "../../../components/ProjectComponents/ProjectPageMainTitle";
import Loading from "../../../components/Saving/Loading";
import TechnologyEditor from "../../../components/DataEditors/TechnologyEditor";
import Saving from "../../../components/Saving/Saving";

export const Route = createFileRoute("/data/technology/edit/$guid")({
	component: RouteComponent,
});

function RouteComponent() {
	const { guid } = Route.useParams();

	const navigation = useNavigate({ from: "/data/technology/edit/$guid" });

	const [tech, setTech] = useState<ITechnology | null>(null);
	const [saving, setSaving] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string>("");

	useEffect(() => {
		async function fetchTechnology(g: string) {
			const t = await actionGetDataTechnologyById(g);
			if (t) {
				setTech(t);
			}
			// Fetch technology data based on the guid
		}

		fetchTechnology(guid);
	}, [guid]);

	function handleConfirm(updatedTech: ITechnology) {
		async function saveTech() {
			setSaving(true);

			try {
				await actionUpdateDataTechnology(updatedTech);
			} catch (error) {
				console.error("Error saving technology:", error);
				setErrorMsg("Failed to save technology. Please try again.");
			}

			setSaving(false);
		}
		saveTech();
	}
	function handleCancel() {
		navigation({ to: "/data/technology" });
	}

	return (
		<DataShell>
			<ProjectPageMainTitle>Edit{tech ? ": " + tech.name : "technology"}</ProjectPageMainTitle>

			{errorMsg && (
				<Alert variant="light" color="red" mb="md">
					{errorMsg}
				</Alert>
			)}

			{!tech && <Loading />}
			{saving && <Saving />}
			{tech && <TechnologyEditor tech={tech} onConfirm={handleConfirm} onCancel={handleCancel} />}
		</DataShell>
	);
}
