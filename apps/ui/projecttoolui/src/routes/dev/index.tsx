import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import DevDebugShell from "../../components/DevDebugShell/DevDebugShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";
import { Box, Button, Switch, Text, Title } from "@mantine/core";
import { apiGetAllTextsFull } from "../../api/texts/apiTexts";

export const Route = createFileRoute("/dev/")({
    component: DevDebugComponent,
});

function DevDebugComponent() {
    const [exportText, setExportText] = useState<string | null>(null);

    return (
        <DevDebugShell>
            <ProjectPageMainTitle mb="lg" mt="md">
                Debug & Development Tools
            </ProjectPageMainTitle>

            <Title order={2} mt="md">
                Export tools
            </Title>
            <ProjectCard>
                <Title order={3} mb="xs" mt="md">
                    Text export
                </Title>
                <Text fs="italic" size="sm" my="xs">
                    Export all texts to JSON and print it to the text box. Main use case for this is to create new
                    default texts.
                </Text>
                <Switch label="Include metadata" mb="md" defaultChecked={false} id="include-metadata" />
                <Button
                    variant="filled"
                    size="lg"
                    onClick={() => {
                        void apiGetAllTextsFull().then((res) => {
                            const includeMetadata = (document.getElementById("include-metadata") as HTMLInputElement)
                                .checked;

                            const data = includeMetadata
                                ? res
                                : res.map((txt) => {
                                      const ntxt = { ...txt };
                                      delete ntxt.metadata;
                                      return ntxt;
                                  });
                            setExportText(JSON.stringify(data, null, 4));
                        });
                    }}
                >
                    Export Texts
                </Button>

                {exportText && (
                    <Box my="md" p="sm">
                        <pre>{exportText}</pre>
                    </Box>
                )}
            </ProjectCard>
        </DevDebugShell>
    );
}
