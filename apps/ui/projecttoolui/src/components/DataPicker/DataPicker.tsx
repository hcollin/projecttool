import { Button, Modal, SimpleGrid } from "@mantine/core";

interface DataPickerProps<T> {
    options: T[];
    onSelectOption: (option: T) => void;
    isOpen: boolean;
    onClose: () => void;

    title?: string;
    valueKey?: keyof T;
    selectedOption?: T;

    columns?: number;
    modalSize?: string | number;
}

const DataPicker = <T,>(props: DataPickerProps<T>) => {
    const cols = props.columns || 3;

    return (
        <Modal
            opened={props.isOpen}
            title={props.title || "Select an option"}
            onClose={props.onClose}
            size={props.modalSize || "xl"}
        >
            <SimpleGrid cols={cols} spacing="md" type="container">
                {props.options.map((option, index) => (
                    <Button
                        variant="contained"
                        size="lg"
                        style={{ whiteSpace: "normal", textAlign: "center", height: "4rem" }}
                        key={index}
                        onClick={() => {
                            props.onSelectOption(option);
                        }}
                    >
                        {props.valueKey ? String(option[props.valueKey]) : String(option)}
                    </Button>
                ))}
            </SimpleGrid>
        </Modal>
    );
};

export default DataPicker;
