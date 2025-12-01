import { createFileRoute, useNavigate } from "@tanstack/react-router";
import DataShell from "../../../components/DataShell/DataShell";

import ProjectPageMainTitle from "../../../components/ProjectComponents/ProjectPageMainTitle";
import { IText } from "@frosttroll/projecttoolmodels";
import { useState } from "react";
import TextEditor from "../../../components/DataEditors/TextEditor";
import { apiPostNewText } from "../../../api/texts/apiTexts";
import Saving from "../../../components/Saving/Saving";

export const Route = createFileRoute("/data/texts/new")({
	component: NewTextComponent,
});

function NewTextComponent() {
	const [text, setText] = useState<Partial<IText>>({
		name: "",
		keywords: [],
		language: "fi",
		content: "",
		organizationId: "default-org",
	});
	const [saving, setSaving] = useState(false);
	const navigate = useNavigate({ from: "/data/texts/new" });

	function handleCancel() {
		navigate({ to: `/data/texts` });
	}

	function handleConfirm(txt: IText) {
		setText(txt);
		setSaving(true);

		apiPostNewText(txt)
			.then(() => {
				setSaving(false);
				// navigate({ to: `/data/texts/edit/${res.guid}` });
				navigate({ to: `/data/texts` });
			})
			.catch((err) => {
				setSaving(false);
				console.error("Error creating new text:", err);
			});
	}

	return (
		<DataShell>
			<ProjectPageMainTitle>New Text</ProjectPageMainTitle>
			{saving && <Saving />}
			{!saving && <TextEditor txt={text} onCancel={handleCancel} onConfirm={handleConfirm} />}
		</DataShell>
	);
}
