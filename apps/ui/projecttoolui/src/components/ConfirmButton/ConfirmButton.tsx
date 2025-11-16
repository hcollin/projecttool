import { Button, ButtonProps, Flex, Modal, Text } from "@mantine/core";
import { useState } from "react";

interface ConfirmButtonProps extends ButtonProps {
	question: string;
	children: React.ReactNode;
	onClick: () => void;
}

const ConfirmButton = (props: ConfirmButtonProps) => {
	const { question, children, onClick } = props;
	const [modalOpen, setModalOpen] = useState(false);

	function handleButtonClick() {
		setModalOpen(true);
	}

	return (
		<>
			<Button {...props} onClick={handleButtonClick}>
				{children}
			</Button>
			<Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Please Confirm" centered>
				<Text size="lg">{question}</Text>

				<Flex justify="flex-end" mt="md" align="center">
					<Button variant="outline" color={props.color} onClick={() => setModalOpen(false)} mr="md">
						No
					</Button>
					<Button
						variant="filled"
						color={props.color || "var(--mantine-color-primary-7)"}
						onClick={() => {
							setModalOpen(false);
							if (onClick) {
								onClick();
							}
						}}
					>
						Yes
					</Button>
				</Flex>
			</Modal>
		</>
	);
};

export default ConfirmButton;
