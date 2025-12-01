// IMPORT: General libaries
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert } from "@mantine/core";

// IMPORT: Components
import DataShell from "../../../components/DataShell/DataShell";
import ProjectPageMainTitle from "../../../components/ProjectComponents/ProjectPageMainTitle";
import { ITechnology } from "@frosttroll/projecttoolmodels";
import TechnologyEditor from "../../../components/DataEditors/TechnologyEditor";
import { actionAddDataTechnology } from "../../../stores/data/tech/dateTechStoreActions";
import { useState } from "react";
import { IconAlertOctagonFilled } from "@tabler/icons-react";
import Saving from "../../../components/Saving/Saving";

export const Route = createFileRoute("/data/technology/new")({
    component: NewTechnologyComponent,
});

function NewTechnologyComponent() {
    const navigate = useNavigate({ from: "/data/technology/new" });
    const [saving, setSaving] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const [newTech, setTech] = useState<ITechnology>({
        guid: "",
        name: "",
        description: "",
        category: [],
        appLayer: [],
    });

    const handleConfirm = async (tech: ITechnology) => {
        setSaving(true);
        console.log("New technology confirmed, now save it:", tech);
        try {
            await actionAddDataTechnology(tech);
            setSaving(false);
            navigate({ to: "/data/technology" });
        } catch (error) {
            console.error("Error saving new technology:", error);
            setErrorMsg("Failed to save new technology. Please try again.");
            setTech(tech);
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate({ to: "/data/technology" });
    };

    return (
        <DataShell>        
                <ProjectPageMainTitle>New Technology</ProjectPageMainTitle>

                {errorMsg && (
                    <Alert variant="light" color="red" mb="md" icon={<IconAlertOctagonFilled color="white" />}>
                        {errorMsg}
                    </Alert>
                )}

                {!saving && <TechnologyEditor tech={newTech} onConfirm={handleConfirm} onCancel={handleCancel} />}

                {saving && <Saving />}
        </DataShell>
    );
}
