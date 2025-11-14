import { Box, Button, Flex, TextInput } from "@mantine/core";
import { IconCancel, IconCheck, IconEdit } from "@tabler/icons-react";
import { useState } from "react";

interface TextInputEditProps {
    children?: React.ReactNode;
    value: string;
    onChange: (newValue: string) => void;
    style?: React.CSSProperties;
}

const TextInputEdit = (props: TextInputEditProps) => {
    const [mode, setMode] = useState<"view" | "edit">("view");
    const [val, setVal] = useState<string>(props.value);

    if (mode === "view") {
        return (
            <Flex style={props.style} align="center" gap="xs" justify="space-between">
                <Box flex="1 1 auto">{props.children}</Box>
                <Button
                    variant="filled"
                    onClick={() => setMode("edit")}
                    size="xs"
                    style={{ flex: "0 0 auto", width: "3rem" }}
                >
                    <IconEdit size="1rem" />
                </Button>
            </Flex>
        );
    }
    return (
        <Flex style={props.style} gap="xs" align="center" justify="space-between">
            <TextInput
                value={val}
                onChange={(e) => setVal(e.currentTarget.value)}
                autoFocus
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        props.onChange(val);
                        setMode("view");
                        return;
                    }

                    if (e.key === "Escape") {
                        setVal(props.value);
                        setMode("view");
                        return;
                    }
                }}
            />
            <Box>
                <Button
                    variant="filled"
                    size="xs"
                    mr="xs"
                    onClick={() => {
                        props.onChange(val);
                        setMode("view");
                    }}
                >
                    <IconCheck size="1rem" />
                </Button>
                <Button
                    variant="outline"
                    size="xs"
                    onClick={() => {
                        setVal(props.value);
                        setMode("view");
                    }}
                >
                    <IconCancel size="1rem" />
                </Button>
            </Box>
        </Flex>
    );
};

export default TextInputEdit;
