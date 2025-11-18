import { ETECHAPPLICATIONLAYER, ITechnology } from "@frosttroll/projecttoolmodels";
import { Card, Flex, Box, Title, Text } from "@mantine/core";
import TechBadge from "./TechBadge";

import "./tech-card.css";
import { IconCancel, IconDatabase, IconDeviceDesktop, IconNetwork, IconPackage, IconQuestionMark, IconServer, IconShield } from "@tabler/icons-react";

interface TechCardProps {
    tech: ITechnology;
    style?: React.CSSProperties;
}

const TechCard = ({ tech, style }: TechCardProps) => {
    const layerClassName = (tech.appLayer.join(" ") || "")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return (
        <Card shadow="md" withBorder className="tech-card" style={{ ...style }} mb="md">
            <Flex direction="row" align="center" justify="flex-start" gap="0" style={{ height: "100%" }}>
                <Box className={`layer-border ${layerClassName}`}>
                    {tech.appLayer.includes(ETECHAPPLICATIONLAYER.FRONTEND) && <IconDeviceDesktop size="2.5rem" />}
                    {tech.appLayer.includes(ETECHAPPLICATIONLAYER.BACKEND) && <IconPackage size="2.5rem" />}
                    {tech.appLayer.includes(ETECHAPPLICATIONLAYER.DATABASE) && <IconDatabase size="2.5rem" />}
                    {tech.appLayer.includes(ETECHAPPLICATIONLAYER.INFRA) && <IconServer size="2.5rem" />}
                    {tech.appLayer.includes(ETECHAPPLICATIONLAYER.SECURITY) && <IconShield size="2.5rem" />}
                    {tech.appLayer.includes(ETECHAPPLICATIONLAYER.NETWORK) && <IconNetwork size="2.5rem" />}
                    {tech.appLayer.includes(ETECHAPPLICATIONLAYER.NONE) && <IconCancel size="2.5rem" />}
                    {tech.appLayer.includes(ETECHAPPLICATIONLAYER.OTHER) && <IconQuestionMark size="2.5rem" />}
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
            </Flex>
        </Card>
    );
};

export default TechCard;
