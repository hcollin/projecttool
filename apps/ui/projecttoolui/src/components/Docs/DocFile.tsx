import { useState } from "react";
import ProjectCard from "../ProjectComponents/ProjectCard";
import { EDOCITEMTYPE, EDOCLANG, EDOCTYPE, IDocFile, IProject } from "@frosttroll/projecttoolmodels";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { useSnapshot } from "valtio";
import { docChangeFileName, docGenerate, docGenerateProjectPlanContent } from "./docFileUtils";
import { Button, Flex, Text } from "@mantine/core";
import TextInputEdit from "../TextInputEdit/TextInputEdit";
import { DateTime } from "luxon";
import { IconAutomation } from "@tabler/icons-react";
import DocRenderHtml from "./DocRenderHtml";
import { IDocFileContent } from "common/projecttoolmodels/dist/src";

interface DocFileProps {
	type: EDOCTYPE;
	lang: EDOCLANG;
}

const DocFile = ({ type, lang }: DocFileProps) => {
	const aps = useSnapshot(activeProjectStore);
	const [doc, setDoc] = useState<IDocFile | null>(() => {
		if (!aps.project) return null;
		return docGenerate(aps.project as IProject, type, lang);
	});

	function handleGenerateProjectPlan() {
		if (!aps.project) return;
		const content = docGenerateProjectPlanContent(aps.project as IProject, lang);
		setDoc((prevDoc) => {
			return { ...prevDoc, content: content } as IDocFile;
		});
	}

	function handleHidePart(contentItem: IDocFileContent) {
        console.log("HIDE ME!", contentItem);
    }

	if (!doc) {
		return null;
	}

	return (
		<>
			<ProjectCard>
				<Flex align="center">
					<Text size="sm" c="gray.5" mr="md" w="6rem">
						File name:
					</Text>
					<TextInputEdit value={doc.filename} onChange={(newFn) => setDoc(docChangeFileName(doc, newFn))}>
						<Text>{doc.filename}</Text>
					</TextInputEdit>
					<Text size="sm" c="gray.5" mr="md" ml="xl" w="6rem">
						File type:
					</Text>
					<Text>{doc.type}</Text>
					<Text size="sm" c="gray.5" mr="md" ml="xl" w="6rem">
						Creator:
					</Text>
					<Text mr="xs">{doc.createdBy}</Text>
					<Text>{DateTime.fromMillis(doc.createdAt).setLocale("fi").toLocaleString(DateTime.DATETIME_SHORT)}</Text>
					<Flex justify="flex-end" style={{ flex: "1 1 auto" }}>
						<Button variant="contained" leftSection={<IconAutomation />} onClick={handleGenerateProjectPlan}>
							Generate
						</Button>
					</Flex>
				</Flex>
			</ProjectCard>

			<DocRenderHtml doc={doc} hidePart={handleHidePart} />
		</>
	);
};

export default DocFile;
