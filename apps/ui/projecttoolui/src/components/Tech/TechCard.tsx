import { ITechnology } from "@frosttroll/projecttoolmodels";
import { Card, Flex, Box, Title, Text } from "@mantine/core";
import TechBadge from "./TechBadge";

import "./tech-card.css";

import TechApplicationLayerIcon from "../Icons/TechApplicationLayerIcon";

interface TechCardProps {
    tech: ITechnology;
    style?: React.CSSProperties;
    onClick?: (tech: ITechnology) => void;
}

const TechCard = ({ tech, style, onClick }: TechCardProps) => {
    const layerClassName = (tech.appLayer.join(" ") || "")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const clickClass = onClick !== undefined ? "clickable" : "";

    return (
        <Card
            shadow="md"
            withBorder
            className={`tech-card ${clickClass}`}
            style={{ ...style }}
            mb="md"
            onClick={() => onClick && onClick(tech)}
        >
            {/* <Flex direction="row" align="center" justify="flex-start" gap="0" style={{ height: "100%" }}> */}
            <Box className={`layer-border ${layerClassName}`}>
                {tech.appLayer.map((layer) => {
                    return <TechApplicationLayerIcon key={layer} appLayer={layer} size="2.5rem" />;
                })}
            </Box>
            <Box className="card-content">
                <Flex justify="space-between" align="center" mb="xs">
                    <Title order={4}>{tech.name}</Title>
                    <Text size="xs">{tech.appLayer.join(", ")}</Text>
                </Flex>

                <Text size="sm" mb="sm">
                    {tech.description}
                </Text>

                <Flex>
                    {tech.category.map((category) => (
                        <TechBadge category={category} mr="xs" size="sm" />
                    ))}
                </Flex>
            </Box>
            {/* </Flex> */}
        </Card>
    );
};

export default TechCard;
