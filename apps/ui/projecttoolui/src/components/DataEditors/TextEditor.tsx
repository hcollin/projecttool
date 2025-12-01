// IMPORT: General Libraries
import { useState } from "react";
import { Button, Card, Flex, Group, Input, Stack, TagsInput, TextInput } from "@mantine/core";

// IMPORT: TipTap Editor and extensions
import { RichTextEditor } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import { TableKit } from "@tiptap/extension-table";

// IMPORT: Common models
import { IText } from "@frosttroll/projecttoolmodels";

// IMPORT: Custom hooks
import { useKeywords } from "../../api/texts/textsHooks";
import { IconCancel, IconDeviceFloppy } from "@tabler/icons-react";

interface ITextEditorProps {
	txt: Partial<IText>;
	onCancel: () => void;
	onConfirm: (txt: IText) => void;
}

const VALIDLANGUAGES = [
	["en", "English"],
	["fi", "Finnish"],
];

const TextEditor = (props: ITextEditorProps) => {
	const { txt } = props;
	const [name, setName] = useState(txt.name || "");
	const [language, setLanguage] = useState(txt.language || "en");
	const [keywords, setKeywords] = useState<string[]>(txt.keywords || []);

	const allKeywords = useKeywords();

	const editor = useEditor({
		shouldRerenderOnTransaction: true,
		extensions: [StarterKit.configure({ link: false }), TextAlign.configure({ types: ["heading", "paragraph"] }), TableKit],
		content: txt.content || "",
	});

	function handleCancel() {
		if (props.onCancel) {
			props.onCancel();
		}
	}

	function handleConfirm() {
		const nText: IText = {
			...txt,
			guid: txt.guid || "",
			organizationId: txt.organizationId || "default-org",
			name: name,
			keywords: keywords,
			language: language,
			content: editor?.getHTML() || "",
		};

		if (props.onConfirm) {
			props.onConfirm(nText);
		}
	}

	return (
		<>
			<Card>
				<Stack gap="md">
					<Flex justify="space-between" align="flex-start">
						<TextInput
							label="Name"
							description="The name of the text. This may also be used as a header text for the content."
							value={name}
							flex="2 2 auto"
							onChange={(event) => setName(event.currentTarget.value)}
						/>

						<Input.Wrapper label="Language" flex="1 1 auto" ml="md" description="The language code of the text (e.g., 'en' for English).">
							<Group gap="xs" style={{ marginTop: "calc(var(--mantine-spacing-xs) / 2)" }}>
								{VALIDLANGUAGES.map(([code, label]) => (
									<Button variant={language === code ? "filled" : "default"} size="sm" onClick={() => setLanguage(code)}>
										<img src={`/flags/${code}.png`} alt={label} height={12} style={{ marginRight: "0.5rem" }} />
										{label}
									</Button>
								))}
							</Group>
						</Input.Wrapper>
					</Flex>

					<TagsInput
						label="Keywords"
						description="Keywords associated with the text that can be used for searching or categorization."
						value={keywords || []}
						onChange={(val) => {
							setKeywords(val);
						}}
						placeholder="Add keyword"
						data={allKeywords}
					/>
				</Stack>
			</Card>

			<RichTextEditor editor={editor} mt="sm" style={{ minHeight: "400px" }} variant="default">
				<RichTextEditor.Toolbar sticky stickyOffset={0}>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />
						<RichTextEditor.Strikethrough />
						<RichTextEditor.ClearFormatting />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Blockquote />
						<RichTextEditor.CodeBlock />
						<RichTextEditor.BulletList />
						<RichTextEditor.OrderedList />
						<RichTextEditor.Hr />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H1 />
						<RichTextEditor.H2 />
						<RichTextEditor.H3 />
						<RichTextEditor.H4 />
						<RichTextEditor.H5 />
						<RichTextEditor.H6 />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.AlignLeft />
						<RichTextEditor.AlignCenter />
						<RichTextEditor.AlignJustify />
						<RichTextEditor.AlignRight />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup></RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>
				<RichTextEditor.Content />
			</RichTextEditor>

			<Card mt="sm">
				<Flex justify="flex-end" gap="md">
					<Button variant="outlined" color="gray" onClick={handleCancel} leftSection={<IconCancel />}>
						Cancel
					</Button>

					<Button variant="filled" onClick={handleConfirm} leftSection={<IconDeviceFloppy />}>
						Confirm
					</Button>
				</Flex>
			</Card>
		</>
	);
};

export default TextEditor;
