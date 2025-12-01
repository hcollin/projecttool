// IMPORT: General Libraries
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert, Container } from "@mantine/core";

// IMPORT: Components
import DataShell from "../../../components/DataShell/DataShell";
import ProjectPageMainTitle from "../../../components/ProjectComponents/ProjectPageMainTitle";

// IMPORT: API Methods
import { apiGetText, apiPostUpdateText } from "../../../api/texts/apiTexts";

// IMPORT: Common Models
import { IText } from "common/projecttoolmodels/dist/src/models/text/iText";
import { RestError } from "../../../api/RestError";
import { IconError404 } from "@tabler/icons-react";
import Loading from "../../../components/Saving/Loading";

import TextEditor from "../../../components/DataEditors/TextEditor";
import Saving from "../../../components/Saving/Saving";

export const Route = createFileRoute("/data/texts/edit/$guid")({
    component: EditTextComponent,
});

function EditTextComponent() {
    const { guid } = Route.useParams();

    const [txt, setTxt] = useState<IText | null | string>(null);
    const [saving, setSaving] = useState<boolean>(false);

    const navigate = useNavigate({ from: "/data/texts/edit/$guid" });

    useEffect(() => {
        // Fetch text data based on the guid
        async function getText(g: string) {
            try {
                const res = await apiGetText(g);

                if (res) {
                    setTxt(res);
                }
            } catch (error) {
                if (error instanceof RestError && error.status === 404) {
                    console.log("RESTERROR,404");
                    setTxt(`Text with GUID ${guid} not found.`);
                    return;
                }

                console.error("\n\nEDIT TEXT: Error fetching text:", error);
                setTxt((error as Error).message as string);
            }
        }

        if (guid) {
            getText(guid);
        } else {
            setTxt(null);
        }
    }, [guid]);

    function handleCancel() {
        console.log("CANCEL EDIT TEXT");
        navigate({ to: "/data/texts" });
    }

    function handleConfirm(txt: IText) {
        console.log("CONFIRM EDITED TEXT:", txt);
        if (txt.guid) {
            setSaving(true);
            apiPostUpdateText(txt).finally(() => {
                setSaving(false);
                navigate({ to: "/data/texts" });
            });
        }
    }

    const error = typeof txt === "string";

    return (
        <DataShell>
            <Container size="xl">
                <ProjectPageMainTitle>{txt && !error ? `Edit Text: ${txt.name}` : "Edit Text"}</ProjectPageMainTitle>

                {saving && <Saving />}
                {txt === null && !error && <Loading />}

                {error && (
                    <Alert color="red" title="Rest Error" icon={<IconError404 />}>
                        {txt}
                    </Alert>
                )}

                {txt && !error && !saving && <TextEditor txt={txt} onCancel={handleCancel} onConfirm={handleConfirm} />}
            </Container>
        </DataShell>
    );
}
