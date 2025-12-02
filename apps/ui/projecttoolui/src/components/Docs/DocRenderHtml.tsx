// IMPORT: General libraries
import { Box, Button, ButtonGroup, Paper } from "@mantine/core";
import { useState } from "react";
import { IconEdit, IconEye, IconEyeOff, IconRowInsertBottom } from "@tabler/icons-react";

// IMPORT: Common models
import {
    EDOCITEMTYPE,
    IDocFile,
    IDocFileHeader,
    IDocFileKeyValue,
    IDocFileHtml,
    IDocFileCover,
    IDocFileContent,
    IDocFileParagraph,
    IProject,
    IDocFileProjectResource,
} from "@frosttroll/projecttoolmodels";

// IMPORT: Doc Renderers
import DocFileEditor from "./DocFileEditor";
import DocRenderHeader from "./renderers/DocRenderHeader";
import DocRenderParagraph from "./renderers/DocRenderParagraph";
import DocRenderKeyValueList from "./renderers/DocRenderKeyValueList";
import DocRenderHtmlBlock from "./renderers/DocRenderHtmlBlock";
import DocRenderTableOfContents from "./renderers/DocRenderTableOfContents";
import DocRenderCover from "./renderers/DocRenderCover";
import DocRenderUnknown from "./renderers/DocRenderUnknown";
import DocRenderProjectResource from "./renderers/DocRenderProjectResource";

// IMPORT: CSS
import "./doc-render.css";

export interface DocRenderHtmlProps {
    doc: IDocFile;
    hidePart: (contentItem: IDocFileContent) => void;
    addPart: (index: number) => void;
    updatePart: (index: number, contentItem: IDocFileContent) => void;
    deletePart: (index: number) => void;
    hideEditButtons: boolean;
    project: IProject;
}

const DocRenderHtml = (props: DocRenderHtmlProps) => {
    return (
        <Paper className="doc-render">
            {props.doc.content.map((contentItem, index) => {
                return <DocRenderContentItem key={index} contentItem={contentItem} index={index} {...props} />;
            })}
        </Paper>
    );
};

export default DocRenderHtml;

const DocRenderContentItem = (props: DocRenderHtmlProps & { contentItem: IDocFileContent; index: number }) => {
    const type = props.contentItem.type;
    const hidden = props.contentItem.hidden;

    const [edit, setEdit] = useState<boolean>(false);

    function handleSaveEdit(updatedContentItem: IDocFileContent) {
        console.log("SAVING EDITED ITEM", updatedContentItem);
        props.updatePart(props.index, updatedContentItem);
        setEdit(false);
    }

    function deleteMe() {
        props.deletePart(props.index);
        setEdit(false);
    }

    return (
        <Box
            className={`doc-content-item doc-content-item-${type.toLowerCase()} ${hidden ? "hidden" : ""} ${edit ? "edit" : ""}`}
        >
            {type === EDOCITEMTYPE.HEADER && !edit && <DocRenderHeader header={props.contentItem as IDocFileHeader} />}
            {type === EDOCITEMTYPE.KEYVALUE && !edit && (
                <DocRenderKeyValueList list={props.contentItem as IDocFileKeyValue} />
            )}
            {type === EDOCITEMTYPE.HTML && !edit && <DocRenderHtmlBlock doc={props.contentItem as IDocFileHtml} />}
            {type === EDOCITEMTYPE.COVER && !edit && <DocRenderCover doc={props.contentItem as IDocFileCover} />}
            {type === EDOCITEMTYPE.TABLEOFCONTENTS && !edit && (
                <DocRenderTableOfContents
                    maxLevel={(props.contentItem as any).maxLevel}
                    docs={props.doc.content}
                    hidden={hidden || false}
                    lang={props.doc.language}
                />
            )}
            {type === EDOCITEMTYPE.UNKNOWN && !edit && (
                <DocRenderUnknown doc={props.contentItem} onClick={() => setEdit(true)} />
            )}
            {type === EDOCITEMTYPE.PARAGRAPH && !edit && (
                <DocRenderParagraph paragraph={props.contentItem as IDocFileParagraph} />
            )}
            {type === EDOCITEMTYPE.PRJRESOURCE && !edit && (
                <DocRenderProjectResource
                    doc={props.contentItem as IDocFileProjectResource}
                    project={props.project}
                    docfile={props.doc}
                />
            )}

            {edit && (
                <DocFileEditor
                    docFile={props.doc}
                    contentItem={props.contentItem}
                    onSave={(item) => handleSaveEdit(item)}
                    onCancel={() => setEdit(false)}
                    onDelete={() => deleteMe()}
                />
            )}
            {props.hideEditButtons === false && type !== EDOCITEMTYPE.UNKNOWN && (
                <DocActionButtons {...props} toggleEdit={() => setEdit(!edit)} editing={edit} />
            )}
        </Box>
    );
};

interface IDocEditProps extends DocRenderHtmlProps {
    contentItem: IDocFileContent;
    index: number;
    toggleEdit: () => void;
    editing?: boolean;
}

const DocActionButtons = (props: IDocEditProps) => {
    const hidden = props.contentItem.hidden;

    function handleAddPart() {
        props.addPart(props.index);
    }

    return (
        <ButtonGroup className="edit-doc-button-group" style={{ float: "right", display: "inline-block" }}>
            <Button variant={props.editing ? "filled" : "filled"} size="xs" onClick={() => props.toggleEdit()}>
                <IconEdit size={16} />
            </Button>
            <Button
                variant="filled"
                size="xs"
                color={hidden ? "gray.7" : "green.9"}
                onClick={() => props.hidePart(props.contentItem)}
                disabled={props.editing}
            >
                {hidden ? <IconEyeOff size={16} /> : <IconEye size={16} />}
            </Button>
            <Button variant="filled" size="xs" color="blue" onClick={() => handleAddPart()}>
                <IconRowInsertBottom size={16} />
            </Button>
        </ButtonGroup>
    );
};
