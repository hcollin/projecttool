import { Box, Flex, Text } from "@mantine/core";

interface ICustomLegendProps {
    payload: { [key: string]: string | number | boolean }[];
    nameKey: string;
    colorKey: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    direction?: "row" | "column";
    width?: string | number;
    align?: "default" | "reverse";
}

const CustomLegend = (props: ICustomLegendProps) => {
    const s = props.size || "md";
    const d = props.direction || "column";
    return (
        <Flex
            gap={d === "row" ? "lg" : "xs"}
            direction={d}
            wrap="wrap"
            style={{ width: props.width || "auto" }}
        >
            {props.payload.map((entry, index) => {
                const col = `var(--mantine-color-${(entry[props.colorKey] as string).replace(".", "-") || "blue-6"})`;

                return (
                    <Flex
                        key={`item-${index}`}
                        align="center"
                        gap="xs"
                        direction={props.align === "reverse" ? "row-reverse" : "row"}
                        justify="flex-start"
                    >
                        <Box
                            style={{
                                backgroundColor: col,
                                width: `var(--mantine-font-size-${s})`,
                                height: `var(--mantine-font-size-${s})`,
                                display: "inline-block",
                            }}
                        />
                        <Text size={s}>{entry[props.nameKey]}</Text>
                    </Flex>
                );
            })}
        </Flex>
    );
};

export default CustomLegend;
