import { useEffect, useState } from "react";
import ProjectCard from "../ProjectComponents/ProjectCard";
import {
    EDOCITEMTYPE,
    EDOCLANG,
    EDOCTYPE,
    IDocFile,
    IDocFileContent,
    IDocFileHeader,
    IProject,
} from "@frosttroll/projecttoolmodels";
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { useSnapshot } from "valtio";
import { docGenerate, docGenerateProjectPlanContent } from "./docFileUtils";
import { ActionIcon, Button, Flex, Select, Text } from "@mantine/core";
import TextInputEdit from "../TextInputEdit/TextInputEdit";

import { IconAutomation, IconDeviceFloppy, IconPencil, IconPencilOff } from "@tabler/icons-react";
import DocRenderHtml from "./DocRenderHtml";
import { PROJECTPLAN_TEMPLATE_LARGE_EN } from "./templates/projectplans/largeplan_en";
import { PROJECTPLAN_TEMPLATE_LARGE_FI } from "./templates/projectplans/largeplan_fi";
import { PROJECTPLAN_TEMPLATE_SMALL_FI } from "./templates/projectplans/smallplan_fi";
import { PROJECTPLAN_TEMPLATE_SMALL_EN } from "./templates/projectplans/smallplan_en";
import { actionUpdateActiveProject } from "../../stores/activeproject/activeProjectActions";

interface DocFileProps {
    type: EDOCTYPE;
    lang: EDOCLANG;
}

const DocFile = ({ type, lang }: DocFileProps) => {
    const aps = useSnapshot(activeProjectStore);
    const [doc, setDoc] = useState<IDocFile | null>(() => {
        if (!aps.project) return null;
        if (aps.project.docs && aps.project.docs[type]) {
            console.log("LOAD EXISTING DOC FILE", aps.project.docs[type]);
            return aps.project.docs[type] as IDocFile;
        }
        return docGenerate(aps.project as IProject, type, lang);
    });

    const [hideedit, setHideEdit] = useState<boolean>(false);

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

    function handleSaveDocument() {
        if (!doc) return;
        console.log("SAVE DOCUMENT", doc);

        if (!aps.project) return;
        if (type === EDOCTYPE.PROJECTPLAN) {
            const np: IProject = { ...aps.project } as IProject;
            const docs: {
                projectplan?: IDocFile | null | undefined;
                solutionplan?: IDocFile | null | undefined;
                [key: string]: IDocFile | null | undefined;
            } = np.docs !== undefined ? { ...np.docs } : { projectplan: { ...doc }, solutionplan: null };

            const saveThis: IProject = { ...np, docs: { ...docs, projectplan: { ...doc } } };
            console.log("SAVE PROJECT PLAN DOC", saveThis);
            actionUpdateActiveProject(saveThis, true);
        }
    }

    if (!doc) {
        return null;
    }

    return (
        <>
            <DocFileGeneratorOptions project={aps.project as IProject} onGenerate={setDoc} docFile={doc} />
            <ProjectCard>
                <Flex align="center" justify="space-between">
                    <Button variant="filled" leftSection={<IconDeviceFloppy />} onClick={handleSaveDocument}>
                        Save Document
                    </Button>

                    <ActionIcon
                        onClick={() => setHideEdit(!hideedit)}
                        size="lg"
                        ml="md"
                        color={!hideedit ? "green.9" : "gray"}
                    >
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
                project={aps.project as IProject}
            />
        </>
    );
};

export default DocFile;

interface IDocFileGeneratorOptionsProps {
    project: IProject;
    onGenerate: (doc: IDocFile) => void;
    docFile: IDocFile;
}

const allTemplates = [
    { value: "projectplan_default", label: "Default Project Plan Template" },
    { value: "projectplan_large", label: "Large Project Plan Template" },
];

function filterTemplatesByType(type: EDOCTYPE): { value: string; label: string }[] {
    return allTemplates.filter((t) => {
        if (type === EDOCTYPE.PROJECTPLAN) {
            if (t.value.startsWith("projectplan_")) {
                return true;
            }
            return false;
        }
        if (type === EDOCTYPE.SOLUTION) {
            if (t.value.startsWith("solution_")) {
                return true;
            }
            return false;
        }
        return false;
    });
}

function getTemplateContent(lang: EDOCLANG, type: EDOCTYPE, template: string): IDocFileContent[] {
    if (type === EDOCTYPE.PROJECTPLAN) {
        if (lang === EDOCLANG.EN) {
            if (template === "projectplan_large") {
                return [...PROJECTPLAN_TEMPLATE_LARGE_EN];
            }
            if (template === "projectplan_default") {
                return [...PROJECTPLAN_TEMPLATE_SMALL_EN];
            }
        }
        if (lang === EDOCLANG.FI) {
            if (template === "projectplan_large") {
                return [...PROJECTPLAN_TEMPLATE_LARGE_FI];
            }
            if (template === "projectplan_default") {
                return [...PROJECTPLAN_TEMPLATE_SMALL_FI];
            }
        }
    }

    return [];
}

const DocFileGeneratorOptions = (props: IDocFileGeneratorOptionsProps) => {
    const { project, onGenerate } = props;

    const [lang, setLang] = useState<EDOCLANG>(EDOCLANG.FI);
    const [type, setType] = useState<EDOCTYPE>(EDOCTYPE.PROJECTPLAN);
    const [fn, setFn] = useState<string>(props.docFile.filename || "new-document.docx");
    const [tmpl, setTmpl] = useState<string | null>(null);

    useEffect(() => {
        const validTemplates = filterTemplatesByType(type);

        if (validTemplates.length > 0) {
            setTmpl(validTemplates[0].value);
        } else {
            setTmpl(null);
        }
    }, [type]);

    function handleGenerateProjectPlan() {
        if (!project) return;
        const doc = docGenerate(project, type, lang);
        doc.filename = fn;
        const content = docGenerateProjectPlanContent(project, lang, getTemplateContent(lang, type, tmpl || ""));
        onGenerate({
            ...doc,
            content: content,
        });
    }

    const selectableTemplates = filterTemplatesByType(type);

    return (
        <ProjectCard>
            <Flex align="center">
                <Text size="sm" c="gray.5" mr="md" w="6rem">
                    File name:
                </Text>
                <TextInputEdit value={fn} onChange={(newFn) => setFn(newFn)}>
                    <Text>{fn}</Text>
                </TextInputEdit>
                <Text size="sm" c="gray.5" mr="md" ml="xl" w="6rem">
                    File type:
                </Text>
                <Select
                    value={type}
                    onChange={(val) => setType(val as EDOCTYPE)}
                    data={[
                        { value: EDOCTYPE.PROJECTPLAN, label: "Project Plan" },
                        { value: EDOCTYPE.SOLUTION, label: "Solution" },
                    ]}
                />

                <Text size="sm" c="gray.5" mr="md" ml="xl" w="6rem">
                    Language:
                </Text>
                <Select
                    value={lang}
                    onChange={(val) => setLang(val as EDOCLANG)}
                    data={[
                        { value: EDOCLANG.EN, label: "English" },
                        { value: EDOCLANG.FI, label: "Finnish" },
                    ]}
                />

                <Flex justify="flex-end" style={{ flex: "1 1 auto" }} ml="md">
                    <Button variant="contained" leftSection={<IconAutomation />} onClick={handleGenerateProjectPlan}>
                        Generate
                    </Button>
                </Flex>
            </Flex>

            <Flex align="center" mt="md">
                <Text size="sm" c="gray.5" mr="md">
                    Project Template
                </Text>
                <Select
                    placeholder="Select template"
                    value={tmpl}
                    onChange={(val) => {
                        setTmpl(val as string);
                    }}
                    data={selectableTemplates}
                    w={300}
                />
            </Flex>
        </ProjectCard>
    );
};
