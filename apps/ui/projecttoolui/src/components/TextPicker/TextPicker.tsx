import { Button, Modal } from "@mantine/core";

import { useState } from "react";

import { IconFileTypeHtml } from "@tabler/icons-react";
import { useTexts } from "../../api/texts/textsHooks";

interface ITextPickerProps {
	onSelect: (textGuid: string) => void;
	children?: React.ReactNode;
}

const TextPicker = (props: ITextPickerProps) => {
	const [open, setOpen] = useState(false);
	const { texts } = useTexts();

	return (
		<>
			<Button variant="filled" onClick={() => setOpen(!open)}>
				{props.children ? (
					props.children
				) : (
					<>
						<IconFileTypeHtml size={16} /> New Text
					</>
				)}
			</Button>
			<Modal opened={open} onClose={() => setOpen(false)} title="Select Text">
				{texts.map((text) => (
					<Button
						key={text.guid}
						fullWidth
						variant="subtle"
						onClick={() => {
							props.onSelect(text.guid);
							setOpen(false);
						}}
					>
						{text.name} - {text.language}
					</Button>
				))}
			</Modal>
		</>
	);
};

export default TextPicker;
