import { Box, Container, Flex, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import DataShell from "../../components/DataShell/DataShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import { useSnapshot } from "valtio";
import dataRolesStore from "../../stores/data/roles/dataRolesStore";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import { useEffect } from "react";
import { actionLoadDataRoleTemplates } from "../../stores/data/roles/dataRolesActions";

export const Route = createFileRoute("/data/roles")({
    component: DataRolesComponent,
});

function DataRolesComponent() {
    const drs = useSnapshot(dataRolesStore);

    useEffect(() => {
        actionLoadDataRoleTemplates();
    }, []);

    return (
        <DataShell>
            <Container size="xl">
                <ProjectPageMainTitle>Data: Team role templates</ProjectPageMainTitle>

                <ProjectCard px="0">
                    {drs.roles.map((role, i) => {
                        const prevRole = i > 0 ? drs.roles[i - 1] : null;

                        const pgroups = prevRole ? prevRole.groups.join(", ") : "";
                        const cgroups = role.groups.join(", ");

                        const newGroup = pgroups !== cgroups;

                        return (
                            <Box
                                key={role.id}
                                style={{
                                    backgroundColor: i % 2 === 0 ? "#0001" : "transparent",
                                    borderTop: prevRole && newGroup ? "solid 2px #0008" : "solid 1px transparent",
                                }}
                                px="md"
                                py="xs"
                            >
                                <Flex align="center" justify="flex-start" gap="md">
                                    <Title order={4} style={{ flex: "0 0 auto", width: "20rem" }}>
                                        {role.name}
                                    </Title>
                                    <Text size="lg" style={{ flex: "1 1 auto", width: "10rem" }}>
                                        {role.groups.join(", ")}
                                    </Text>

                                    <Text>{role.seniorities.join(", ")}</Text>
                                </Flex>
                                <Text size="sm">{role.description}</Text>
                            </Box>
                        );
                    })}
                </ProjectCard>
            </Container>
        </DataShell>
    );
}
