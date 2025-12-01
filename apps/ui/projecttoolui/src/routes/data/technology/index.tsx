// IMPORT: Libraries
import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ActionIcon, Button, Container, Flex, Tooltip } from "@mantine/core";
import { useSnapshot } from "valtio";

// IMPORT: Icons
import { IconPlus, IconSquareAsterisk } from "@tabler/icons-react";

// IMPORT: Common Models
import { ETECHAPPLICATIONLAYER, ITechnology } from "@frosttroll/projecttoolmodels";

// IMPORT: Components
import DataShell from "../../../components/DataShell/DataShell";
import ProjectPageMainTitle from "../../../components/ProjectComponents/ProjectPageMainTitle";
import TechCard from "../../../components/Tech/TechCard";

// IMPORT: Stores and actions
import techStore from "../../../stores/data/tech/dataTechStore";
import { actionLoadDataTechnologies } from "../../../stores/data/tech/dateTechStoreActions";
import ProjectCard from "../../../components/ProjectComponents/ProjectCard";
import TechApplicationLayerIcon from "../../../components/Icons/TechApplicationLayerIcon";

export const Route = createFileRoute("/data/technology/")({
    component: DataTechnologiesComponent,
});

type SORTEDBY = "Name" | "Category" | "App Layer";
const SORTEDBY_VALUES: SORTEDBY[] = ["Name", "Category", "App Layer"];

function DataTechnologiesComponent() {
    const tds = useSnapshot(techStore);
    const navigate = useNavigate({ from: "/data/texts" });

    const [sortby, setSortby] = useState<SORTEDBY>("Name");
    const [appLayerFilters, setAppLayerFilters] = useState<ETECHAPPLICATIONLAYER[]>([
        ETECHAPPLICATIONLAYER.FRONTEND,
        ETECHAPPLICATIONLAYER.BACKEND,
        ETECHAPPLICATIONLAYER.DATABASE,
        ETECHAPPLICATIONLAYER.INFRA,
        ETECHAPPLICATIONLAYER.NETWORK,
        ETECHAPPLICATIONLAYER.SECURITY,
        ETECHAPPLICATIONLAYER.OTHER,
        ETECHAPPLICATIONLAYER.NONE,
    ]);

    useEffect(() => {
        actionLoadDataTechnologies();
    }, []);

    const sortedTechs = [...tds.technologies]
        .filter((tech) => {
            // Filter by app layer
            for (const al of tech.appLayer) {
                if (appLayerFilters.includes(al)) {
                    return true;
                }
            }
            return false;
        })
        .sort((a, b) => {
            if (sortby === "Name") {
                return a.name.localeCompare(b.name);
            }
            if (sortby === "Category") {
                const acat = a.category[0] || "";
                const bcat = b.category[0] || "";
                return acat.localeCompare(bcat);
            }
            if (sortby === "App Layer") {
                const alayer = a.appLayer[0] || "";
                const blayer = b.appLayer[0] || "";
                return alayer.localeCompare(blayer);
            }
            return 0;
        });

    const appLayerOptions = Object.values(ETECHAPPLICATIONLAYER);

    return (
        <DataShell>
            <Container size="xl">
                <ProjectPageMainTitle>
                    <>
                        Data: Technologies
                        <Button variant="contained" ml="xl" size="lg" component={Link} to="/data/technology/new">
                            <IconPlus /> Add New Technology
                        </Button>
                    </>
                </ProjectPageMainTitle>

                <ProjectCard>
                    <Flex align="center" justify="space-between" mb="md">
                        <Flex align="center" justify="flex-start" mb="md" gap="sm">
                            {SORTEDBY_VALUES.map((value) => (
                                <Button
                                    variant={sortby === value ? "filled" : "light"}
                                    onClick={() => setSortby(value)}
                                >
                                    Sort by {value}
                                </Button>
                            ))}
                        </Flex>

                        <Flex gap="xs">
                            {appLayerOptions.map((layer) => (
                                <Tooltip key={`layer-filter-${layer}`} label={layer as string} withArrow>
                                    <ActionIcon
                                        variant="filled"
                                        size="xl"
                                        color={appLayerFilters.includes(layer) ? "blue.7" : "gray.6"}
                                        onClick={() => {
                                            if (appLayerFilters.includes(layer)) {
                                                // Remove from filters
                                                setAppLayerFilters(appLayerFilters.filter((al) => al !== layer));
                                            } else {
                                                // Add to filters
                                                setAppLayerFilters([...appLayerFilters, layer]);
                                            }
                                        }}
                                    >
                                        <TechApplicationLayerIcon appLayer={layer} />
                                    </ActionIcon>
                                </Tooltip>
                            ))}
                            <Tooltip label="Select/Deselect All Layers" withArrow>
                                <ActionIcon
                                    variant="filled"
                                    size="xl"
                                    color="indigo.7"
                                    onClick={() => {
                                        if (appLayerFilters.length === appLayerOptions.length) {
                                            setAppLayerFilters([]);
                                        } else {
                                            setAppLayerFilters(appLayerOptions as ETECHAPPLICATIONLAYER[]);
                                        }
                                    }}
                                >
                                    <IconSquareAsterisk />
                                </ActionIcon>
                            </Tooltip>
                        </Flex>
                    </Flex>

                    <Flex align="flex-start" justify="space-between" mb="md" wrap="wrap">
                        {sortedTechs.map((tech) => {
                            return (
                                <TechCard
                                    tech={tech as ITechnology}
                                    key={tech.guid}
                                    style={{ flex: "0 0 auto", width: "30%", height: "9rem" }}
                                    onClick={(t: ITechnology) => navigate({ to: `/data/technology/edit/${t.guid}` })}
                                />
                            );
                        })}
                    </Flex>
                </ProjectCard>
            </Container>
        </DataShell>
    );
}
