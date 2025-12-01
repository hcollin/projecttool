import { EDOCITEMTYPE, IDocFile, IDocFileHeader, IDocFileKeyValue, IDocFileHtml, IDocFileCover, IDocFileContent } from "@frosttroll/projecttoolmodels";
import { Button, ButtonGroup, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import { apiGetText } from "../../api/texts/apiTexts";
import { IconDisabled, IconEdit, IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";

interface DocRenderHtmlProps {
	doc: IDocFile;
	hidePart: (contentItem: IDocFileContent) => void;
}

const DocRenderHtml = (props: DocRenderHtmlProps) => {
	return (
		<Paper>
			{props.doc.content.map((contentItem, index) => {
				return <DocRenderContentItem key={index} contentItem={contentItem} docfile={props.doc} hidePart={props.hidePart} />;
			})}
		</Paper>
	);
};

export default DocRenderHtml;

const DocRenderContentItem = (props: { contentItem: IDocFileContent; docfile: IDocFile; hidePart: (contentItem: IDocFileContent) => void }) => {
	const type = props.contentItem.type;

	return (
		<>
			{type === EDOCITEMTYPE.HEADER && <DocRenderHeader header={props.contentItem as IDocFileHeader} />}
			{type === EDOCITEMTYPE.KEYVALUE && <DocRenderKeyValueList list={props.contentItem as IDocFileKeyValue} />}
			{type === EDOCITEMTYPE.HTML && <DocRenderHtmlBlock doc={props.contentItem as IDocFileHtml} />}
			{type === EDOCITEMTYPE.COVER && <DocRenderCover doc={props.contentItem as IDocFileCover} />}
			{type === EDOCITEMTYPE.TABLEOFCONTENTS && <DocRenderTableOfContents maxLevel={(props.contentItem as any).maxLevel} docs={[]} />}
			<DocEdit toggleHide={props.hidePart} contentItem={props.contentItem} />
		</>
	);
};

const DocEdit = (props: { toggleHide: (contentItem: IDocFileContent) => void; contentItem: IDocFileContent }) => {
	return (
		<ButtonGroup style={{ float: "right", display: "inline-block" }}>
			<Button variant="filled" size="xs">
				<IconEdit size={16} />
			</Button>
			<Button variant="filled" size="xs" color="green" onClick={() => props.toggleHide(props.contentItem)}>
				{/* <IconEyeOff size={16} /> */}
				<IconEye size={16} />
			</Button>
		</ButtonGroup>
	);
};

const DocRenderHeader = (props: { header: IDocFileHeader }) => {
	const { header } = props;
	const id = convertTextToId(header.text);

	switch (header.level) {
		case 1:
			return <h1 id={id}>{header.text}</h1>;
		case 2:
			return <h2 id={id}>{header.text}</h2>;
		case 3:
			return <h3 id={id}>{header.text}</h3>;
		default:
			return <h4 id={id}>{header.text}</h4>;
	}
};

const DocRenderKeyValueList = (props: { list: IDocFileKeyValue }) => {
	if (props.list.style === "table") {
		return null;
	}

	return (
		<ul>
			{props.list.items.map((item, index) => (
				<li key={index}>
					<strong>{item[0]}:</strong> {item[1]}
				</li>
			))}
		</ul>
	);
};

const DocRenderHtmlBlock = (props: { doc: IDocFileHtml }) => {
	const [txt, setTxt] = useState<string>("Loading...");

	useEffect(() => {
		apiGetText(props.doc.key).then((res) => {
			if (res) {
				setTxt(res.content);
			} else {
				setTxt(`!! Error loading text content ${props.doc.key} !!`);
			}
		});
	}, [props.doc.key]);

	return <>{txt}</>;
};

const DocRenderCover = (props: { doc: IDocFileCover }) => {
	return (
		<>
			<h1 className="main-title" style={{ fontSize: "3rem" }}>
				{props.doc.title}
			</h1>
			{props.doc.subtitle && (
				<h2 className="sub-title" style={{ fontSize: "2rem" }}>
					{props.doc.subtitle}
				</h2>
			)}
			{props.doc.client && <h3>Client: {props.doc.client}</h3>}
			{props.doc.writers && <h3>Writers: {props.doc.writers.join(", ")}</h3>}
		</>
	);
};

const DocRenderTableOfContents = (props: { maxLevel: number; docs: IDocFileContent[] }) => {
	const headers = props.docs.filter((doc) => {
		if (doc.type !== EDOCITEMTYPE.HEADER) {
			return false;
		}
		const header = doc as IDocFileHeader;
		return header.level <= props.maxLevel;
	}) as IDocFileHeader[];

	return (
		<>
			<h1>Table of Contents</h1>
			<ul>
				{headers.map((header, index) => (
					<li key={index} style={{ marginLeft: (header.level - 1) * 20 }}>
						<a href={`#${convertTextToId(header.text)}`}>{header.text}</a>
					</li>
				))}
			</ul>
		</>
	);
};

function convertTextToId(text: string): string {
	return text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}
