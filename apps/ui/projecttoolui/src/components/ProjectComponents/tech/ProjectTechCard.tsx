import { Flex, Title, Box, Button, Modal, Alert, ActionIcon, Text, UnstyledButton } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { ETECHAPPLICATIONLAYER, ITechnology } from "@frosttroll/projecttoolmodels";
import { useState } from "react";
import { useSnapshot } from "valtio";
import techStore from "../../../stores/data/tech/dataTechStore";
import TechCard from "../../Tech/TechCard";
import ProjectCard from "../ProjectCard";
import { actionUpdateProjectTechStack } from "../../../stores/activeproject/activeProjectActions";

import "./project-tech-card.css";
import activeProjectStore from "../../../stores/activeproject/activeProjectStore";

interface IProjectTechCardProps {
    title: string;
    target: "frontend" | "backend" | "data" | "platform" | "tools";
    appLayers: ETECHAPPLICATIONLAYER[];
}

const ProjectTechCard = (props: IProjectTechCardProps) => {
    const tds = useSnapshot(techStore);
    const aps = useSnapshot(activeProjectStore);

    const [techs, setTechs] = useState<ITechnology[]>(() => {
        if (!aps.project) return [];
        const techIds = aps.project.techStack[props.target];
        if (!techIds || techIds.length === 0) return [];

        const selectedTechs = tds.technologies.filter((t) => techIds.includes(t.guid)) as ITechnology[];
        return selectedTechs;
    });
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function handleAddTech(tech: ITechnology) {
        const ntechs = [...techs, tech];
        setTechs(ntechs);
        setModalOpen(false);
        actionUpdateProjectTechStack(ntechs, props.target);
    }

    function handleRemoveTech(techGuid: string) {
        const ntechs = techs.filter((t) => t.guid !== techGuid);
        setTechs(ntechs);
        actionUpdateProjectTechStack(ntechs, props.target);
    }

    const availableTechs = tds.technologies.filter((t) => {
        const hasMatch = t.appLayer.some((layer) => props.appLayers.includes(layer));
        return hasMatch;
    });

    return (
        <Box className="project-tech-card">
            <Flex direction="row" align="center" justify="space-between" gap="sm" mb="xs">
                <Title order={2}>{props.title}</Title>
                <Box>
                    <Button variant="contained" leftSection={<IconPlus />} size="sm" onClick={() => setModalOpen(true)}>
                        Add Tech
                    </Button>
                </Box>
            </Flex>

            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Add Technology"
                size="70%"
                className="project-tech-add-modal"
            >
                <Flex direction="row" align="center" justify="flex-start" gap="sm" wrap="wrap">
                    {availableTechs.map((tech) => (
                        <UnstyledButton
                            className="tech-option"
                            key={tech.guid}
                            size="md"
                            style={{ width: "24%", maxWidth: "300px", whiteSpace: "normal" }}
                            onClick={() => {
                                handleAddTech(tech as ITechnology);
                            }}
                        >
                            <Text size="md" className="name">
                                {tech.name}
                            </Text>
                            <Text className="categories">{tech.category.join(", ")}</Text>
                        </UnstyledButton>
                    ))}

                    {availableTechs.length === 0 && (
                        <Alert title="Error" color="red.5">
                            No available technologies to add.
                        </Alert>
                    )}
                </Flex>
            </Modal>
            <ProjectCard mb="md" className="tech-card-container">
                <Flex direction="row" align="flex-start" justify="flex-start" gap="lg" wrap="wrap">
                    {techs.map((tech) => (
                        <Box key={tech.guid} className="selected-tech">
                            <ActionIcon
                                variant="filled"
                                color="red.7"
                                size="lg"
                                className="remove-tech-button"
                                onClick={() => {
                                    handleRemoveTech(tech.guid);
                                }}
                            >
                                <IconTrash />
                            </ActionIcon>
                            <TechCard key={tech.guid} tech={tech as ITechnology} />
                        </Box>
                    ))}
                    {techs.length === 0 && <Text c="orange.1">No technologies added yet.</Text>}
                </Flex>
            </ProjectCard>
        </Box>
    );
};
export default ProjectTechCard;
