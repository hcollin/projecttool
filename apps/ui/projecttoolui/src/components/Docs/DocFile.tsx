import { useState } from "react";
import ProjectCard from "../ProjectComponents/ProjectCard";
import { EDOCITEMTYPE, EDOCLANG, EDOCTYPE, IDocFile, IDocFileContent, IDocFileHeader, IProject } from "@frosttroll/projecttoolmodels";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { useSnapshot } from "valtio";
import { docChangeFileName, docGenerate, docGenerateProjectPlanContent } from "./docFileUtils";
import { ActionIcon, Button, Flex, Text } from "@mantine/core";
import TextInputEdit from "../TextInputEdit/TextInputEdit";
import { DateTime } from "luxon";
import { IconAutomation, IconEdit, IconPencil, IconPencilOff } from "@tabler/icons-react";
import DocRenderHtml from "./DocRenderHtml";

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

	const [hideedit, setHideEdit] = useState<boolean>(true);

	function handleGenerateProjectPlan() {
		if (!aps.project) return;
		const content = docGenerateProjectPlanContent(aps.project as IProject, lang);
		setDoc((prevDoc) => {
			return { ...prevDoc, content: content } as IDocFile;
		});
	}

	function handleHidePart(contentItem: IDocFileContent) {
		console.log("HIDE ME!", contentItem);
		setDoc((prevDoc) => {
			if (!prevDoc) return prevDoc;

			let targetHeaderLevel = -1;
			const ndc = prevDoc.content.map((di: IDocFileContent) => {
				if (di === contentItem) {
					if (contentItem.type === EDOCITEMTYPE.HEADER) {
						targetHeaderLevel = (contentItem as IDocFileHeader).level;
					}
					return { ...di, hidden: !di.hidden } as IDocFileContent;
				}
				if (targetHeaderLevel > -1 && di.type !== EDOCITEMTYPE.HEADER) {
					return { ...di, hidden: !di.hidden } as IDocFileContent;
				}
				if (targetHeaderLevel > -1 && di.type === EDOCITEMTYPE.HEADER) {
					const dih = di as IDocFileHeader;
					if (dih.level <= targetHeaderLevel) {
						targetHeaderLevel = -1;
						return di;
					}
					return { ...di, hidden: !di.hidden } as IDocFileContent;
				}

				return di;
			});
			return { ...prevDoc, content: ndc } as IDocFile;
		});
	}

	function handleUpdatePart(index: number, contentItem: IDocFileContent) {
		setDoc((prevDoc) => {
			if (!prevDoc) return prevDoc;
			const ndc = [...prevDoc.content];
			ndc[index] = contentItem;
			return { ...prevDoc, content: ndc } as IDocFile;
		});
	}

	function handleAddPart(index: number) {
		const newContentItem: IDocFileContent = {
			type: EDOCITEMTYPE.UNKNOWN,
		};

		if (newContentItem.type === undefined) {
			console.error("Cannot add content item with undefined type");
			return;
		}

		setDoc((prevDoc) => {
			if (!prevDoc) return prevDoc;

			const ndc = [...prevDoc.content];
			console.log(newContentItem, index);
			ndc.splice(index + 1, 0, newContentItem);
			return { ...prevDoc, content: ndc } as IDocFile;
		});
	}

	function handleDeletePart(index: number) {
		setDoc((prevDoc) => {
			if (!prevDoc) return prevDoc;
			const ndc = [...prevDoc.content];
			ndc.splice(index, 1);
			return { ...prevDoc, content: ndc } as IDocFile;
		});
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

					<ActionIcon onClick={() => setHideEdit(!hideedit)} size="lg" ml="md" color={!hideedit ? "green.9" : "gray"}>
						{!hideedit ? <IconPencil /> : <IconPencilOff />}
					</ActionIcon>
				</Flex>
			</ProjectCard>

			<DocRenderHtml
				doc={doc}
				hidePart={handleHidePart}
				addPart={handleAddPart}
				updatePart={handleUpdatePart}
				deletePart={handleDeletePart}
				hideEditButtons={hideedit}
			/>
		</>
	);
};

export default DocFile;
