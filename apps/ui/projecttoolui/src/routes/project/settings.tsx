// IMPORT: General Libraries
import { useState } from "react";
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
import { createFileRoute } from "@tanstack/react-router";
import { ActionIcon, Box, Button, Container, Flex, NumberInput, Select, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";

// IMPORT: Icons
import { IconDice6Filled } from "@tabler/icons-react";

// IMPORT: Common Models and Utils
import { CURRENCY, IProject, utilCurrencyToSymbol } from "@frosttroll/projecttoolmodels";
import { generateRandomProjectName } from "@frosttroll/projecttoolutils";

// IMPORT: Custom Components
import ProjectShell from "../../components/ProjectShell/ProjectShell";
import ProjectPageMainTitle from "../../components/ProjectComponents/ProjectPageMainTitle";
import ProjectCard from "../../components/ProjectComponents/ProjectCard";

// IMPORT: Stores and Actions
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { actionUpdateActiveProject } from "../../stores/activeproject/activeProjectActions";

export const Route = createFileRoute("/project/settings")({
    component: ProjectSettingsComponent,
});

function ProjectSettingsComponent() {
    const aps = useSnapshot(activeProjectStore);

    const [codename, setCodename] = useState(aps.project?.codename || "");
    const [realname, setRealname] = useState(aps.project?.realname || "");
    const [clientName, setClientName] = useState(aps.project?.clientName || "");

    const [startDate, setStartDate] = useState<string | null>(
        aps.project?.start ? dayjs(aps.project.start).format("YYYY-MM-DD") : null
    );
    const [endDate, setEndDate] = useState<string | null>(
        aps.project?.end ? dayjs(aps.project.end).format("YYYY-MM-DD") : null
    );

    const [budget, setBudget] = useState<number>(aps.project?.targetBudget || 0);

    const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.EUR);

    const handleSaveChanges = () => {
        if (aps.project === null) {
            return;
        }
        const np: IProject = { ...(aps.project as IProject), codename: codename };
        if (realname.length > 0) {
            np.realname = realname;
        }
        if (clientName.length > 0) {
            np.clientName = clientName;
        }

        if (startDate) {
            np.start = dayjs(startDate).startOf("day").valueOf();
        }

        if (endDate) {
            np.end = dayjs(endDate).startOf("day").valueOf();
        }

        if (budget >= 0) {
            np.targetBudget = budget;
        }

		np.currency = currency;

        np.roles = [...(aps.project.roles as IProject["roles"])];
        np.phases = [...(aps.project.phases as IProject["phases"])];
        np.prices = {
            hourlypricegroups: [...(aps.project.prices.hourlypricegroups as IProject["prices"]["hourlypricegroups"])],
            fixedprices: [...(aps.project.prices.fixedprices as IProject["prices"]["fixedprices"])],
        };
        // np.prices = { ...(aps.project.prices as IProject["prices"]) };
        actionUpdateActiveProject(np);
    };

    const handleReset = () => {
        setCodename(aps.project?.codename || "");
        setRealname(aps.project?.realname || "");
        setClientName(aps.project?.clientName || "");
    };

    return (
        <ProjectShell>
            <Container size="xl" className="project-shell-container">
                <ProjectPageMainTitle>Project Settings</ProjectPageMainTitle>

                <Title order={2}>General Project Information</Title>
                <ProjectCard>
                    <Flex align="center" justify="space-between" mb="lg" gap="md">
                        <TextInput
                            style={{ flex: "1 1 auto" }}
                            size="lg"
                            radius="xs"
                            label="Project Codename"
                            description="Internal project code name used for identification."
                            mb="lg"
                            value={codename}
                            onChange={(e) => setCodename(e.target.value)}
                        />

                        <ActionIcon
                            variant="filled"
                            size="xl"
                            style={{ flex: "0 0 auto", marginLeft: "2rem" }}
                            onClick={() => {
                                setCodename(generateRandomProjectName());
                            }}
                        >
                            <IconDice6Filled />
                        </ActionIcon>
                    </Flex>

                    <TextInput
                        size="lg"
                        radius="xs"
                        label="Real Project Name"
                        description="The official real name of the project."
                        mb="lg"
                        value={realname}
                        onChange={(e) => setRealname(e.target.value)}
                    />

                    <TextInput
                        size="lg"
                        radius="xs"
                        label="Client Name"
                        description="Name of the client for whom the project is being done."
                        mb="lg"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </ProjectCard>

                <Title order={2}>Timeline</Title>
                <ProjectCard mt="lg">
                    <Flex align="center" justify="flex-start" mb="lg" gap="xl">
                        <Box>
                            <DateInput
                                size="lg"
                                clearable
                                minDate={dayjs().startOf("day").subtract(14, "day").format("YYYY-MM-DD")}
                                label="Project Start Date"
                                description="The planned start date of the project."
                                placeholder="Select start date"
                                withWeekNumbers
                                locale="fi"
                                value={startDate}
                                onChange={(date) => setStartDate(date ? dayjs(date).format("YYYY-MM-DD") : null)}
                            />
                        </Box>
                        <Box>
                            <DateInput
                                size="lg"
                                clearable
                                minDate={dayjs().startOf("day").subtract(14, "day").format("YYYY-MM-DD")}
                                label="Project End Date or Deadline"
                                description="The planned end date or deadline of the project."
                                placeholder="Select end date"
                                withWeekNumbers
                                locale="fi"
                                value={endDate}
                                onChange={(date) => setEndDate(date ? dayjs(date).format("YYYY-MM-DD") : null)}
                            />
                        </Box>
                    </Flex>
                </ProjectCard>

                <Title order={2}>Financial</Title>
                <ProjectCard mt="lg">
                    <Flex mb="lg" gap="xl">
                        <NumberInput
                            size="lg"
                            radius="xs"
                            label="Target Budget (€) for the Project"
                            description="The target budget for the project in euros."
                            mb="lg"
                            thousandSeparator=" "
                            value={budget}
                            suffix={utilCurrencyToSymbol(currency)}
                            onChange={(value) => {
                                setBudget(typeof value === "number" ? value : parseFloat(value || "0"));
                            }}
                        />
                        <Select
                            size="lg"
                            radius="xs"
                            label="Currency"
                            description="Select the currency for the project budget."
                            data={[
                                { value: CURRENCY.EUR, label: "Euro (€)" },
                                { value: CURRENCY.USD, label: "US Dollar ($)" },
                                { value: CURRENCY.GBP, label: "British Pound (£)" },
                                { value: CURRENCY.JPY, label: "Japanese Yen (¥)" },
                                { value: CURRENCY.CNY, label: "Chinese Yuan (¥)" },
                            ]}
                            value={currency}
                            onChange={(value) => setCurrency(value as CURRENCY)}
                        />
                    </Flex>
                </ProjectCard>

                <ProjectCard mt="lg">
                    <Flex justify="flex-end" align="center">
                        <Button variant="default" color="gray" mr="md" onClick={handleReset}>
                            Reset
                        </Button>
                        <Button variant="filled" color="blue" mr="md" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Flex>
                </ProjectCard>
            </Container>
        </ProjectShell>
    );
}
