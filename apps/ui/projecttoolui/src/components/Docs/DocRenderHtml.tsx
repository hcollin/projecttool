import { EDOCITEMTYPE, IDocFile, IDocFileHeader, IDocFileKeyValue } from "@frosttroll/projecttoolmodels";
import { Paper } from "@mantine/core";

interface DocRenderHtmlProps {
	doc: IDocFile;
}

const DocRenderHtml = (props: DocRenderHtmlProps) => {
	return (
		<Paper>
			{props.doc.content.map((contentItem, index) => {
				if (contentItem.type === EDOCITEMTYPE.HEADER) {
					return <DocRenderHeader key={index} header={contentItem as IDocFileHeader} />;
				}

				if (contentItem.type === EDOCITEMTYPE.KEYVALUE) {
					return <DocRenderKeyValueList key={index} list={contentItem as IDocFileKeyValue} />;
				}
				return null;
			})}
		</Paper>
	);
};

export default DocRenderHtml;

const DocRenderHeader = (props: { header: IDocFileHeader }) => {
	const { header } = props;
	switch (header.level) {
		case 1:
			return <h1>{header.text}</h1>;
		case 2:
			return <h2>{header.text}</h2>;
		case 3:
			return <h3>{header.text}</h3>;
		default:
			return <h4>{header.text}</h4>;
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
