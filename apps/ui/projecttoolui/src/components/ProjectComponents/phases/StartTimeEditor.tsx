import { Flex, Box, Button, Switch, Select, NumberInput, Alert, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";
import { IconCancel, IconCheck } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";

import { IPhase, IProject, IPhaseStart } from "@frosttroll/projecttoolmodels";

const StartTimeEditor = (props: {
    phase: IPhase;
    project: IProject;
    onSave: (start: IPhaseStart) => void;
    onCancel: () => void;
}) => {
    const start = props.phase.start;

    const [atPrjStart, setAtPrjStart] = useState<boolean>(start.atProjectStart || false);
    const [startDate, setStartDate] = useState<number>(start.ts || 0);
    const [afterPhaseGuid, setAfterPhaseGuid] = useState<string>(start.afterPhaseGuid || "");
    const [offsetInDays, setOffsetInDays] = useState<number>(start.offsetInDays || 0);

    let valid = false;
    if (atPrjStart) {
        valid = true;
    } else if (startDate > 0) {
        valid = true;
    } else if (afterPhaseGuid !== "") {
        valid = true;
    }

    function handleToggleAtProjectStart(checked: boolean) {
        if (checked) {
            setStartDate(0);
            setAfterPhaseGuid("");
        }
        setAtPrjStart(checked);
    }

    function handleTargetStartDateChange(date: string | null) {
        if (date) {
            setAtPrjStart(false);
            setStartDate(dayjs(date).valueOf());
            setAfterPhaseGuid("");
        }
    }

    function handleAfterPhaseChange(phaseGuid: string) {
        setAfterPhaseGuid(phaseGuid);
        setAtPrjStart((prev) => (prev === true ? false : prev));
        setStartDate((prev) => (prev !== 0 ? 0 : prev));
    }

    function handleSave() {
        const nstart: IPhaseStart = {
            atProjectStart: atPrjStart,
            ts: startDate > 0 ? startDate : undefined,
            afterPhaseGuid: afterPhaseGuid !== "" ? afterPhaseGuid : undefined,
            offsetInDays: offsetInDays !== undefined && offsetInDays !== 0 ? offsetInDays : undefined,
        };

        console.log("Saving new phase start time:", nstart);

        props.onSave(nstart);
    }

    const validPhases = props.project.phases.filter((p) => p.guid !== props.phase.guid);

    return (
        <>
            <Flex align="center" justify="space-between" style={{ height: "3rem" }}>
                <Text size="xl">Modify when the phase begins:</Text>
                <Box style={{ height: "100%" }}>
                    <Button variant="outline" onClick={props.onCancel} mr="sm" style={{ height: "100%" }}>
                        <IconCancel size={20} />
                    </Button>
                    <Button variant="contained" onClick={handleSave} style={{ height: "100%" }} disabled={!valid}>
                        <IconCheck size={20} />
                    </Button>
                </Box>
            </Flex>
            <Flex align="center" justify="space-between" gap="md" style={{ height: "5rem" }}>
                <Box>
                    <Switch
                        label="At project start"
                        checked={atPrjStart}
                        onChange={(event) => handleToggleAtProjectStart(event.currentTarget.checked)}
                    />
                </Box>

                <Box>
                    <DatePickerInput
                        placeholder="Pick a phase date"
                        label="Start at date"
                        value={startDate > 0 ? dayjs(startDate).format("YYYY-MM-DD") : null}
                        onChange={(date) => handleTargetStartDateChange(date)}
                    />
                </Box>

                <Box>
                    <Select
                        data={validPhases.map((p) => ({ value: p.guid, label: p.name }))}
                        label="Start After phase"
                        placeholder="Select a phase"
                        value={afterPhaseGuid !== "" ? afterPhaseGuid : null}
                        onChange={(val) => handleAfterPhaseChange(val || "")}
                    />
                </Box>

                <Box>
                    <NumberInput
                        label="Offset in days"
                        value={offsetInDays}
                        onChange={(value) => setOffsetInDays(typeof value === "string" ? parseInt(value) : value)}
                    />
                </Box>
            </Flex>
            {!valid && (
                <Alert variant="light" color="red" title="Invalid start time configuration" mt="md">
                    Please specify at least one start time option.
                </Alert>
            )}
        </>
    );
};

export default StartTimeEditor;
