import { Flex, Box, Button, Switch, NumberInput, Select, Alert, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCancel, IconCheck } from "@tabler/icons-react";
import { IPhase, IProject, IPhaseStart, IPhaseEnd } from "@frosttroll/projecttoolmodels";
import dayjs from "dayjs";
import { useState } from "react";

const EndTimeEditor = (props: {
    phase: IPhase;
    project: IProject;
    onSave: (start: IPhaseStart) => void;
    onCancel: () => void;
}) => {
    const end = props.phase.end;

    const [atPrjEnd, setAtPrjEnd] = useState<boolean>(end.atProjectEnd || false);
    const [endDate, setEndDate] = useState<number>(end.ts || 0);
    const [whenPhaseEnds, setWhenPhaseEnds] = useState<string>(end.whenPhaseGuidEnds || "");
    const [lengthInWDays, setLengthInWDays] = useState<number>(end.lengthInWorkingDays || 0);
    const [whenPhaseStarts, setWhenPhaseStarts] = useState<string>(end.whenPhaseGuidStarts || "");
    const [offsetInDays, setOffsetInDays] = useState<number>(end.offsetInDays || 0);

    let valid = false;
    if (atPrjEnd) {
        valid = true;
    } else if (endDate > 0) {
        valid = true;
    } else if (whenPhaseEnds !== "") {
        valid = true;
    } else if (whenPhaseStarts !== "") {
        valid = true;
    } else if (lengthInWDays > 0) {
        valid = true;
    }

    function handleToggleAtProjectEnd(checked: boolean) {
        if (checked) {
            setEndDate(0);
            setWhenPhaseEnds("");
            setWhenPhaseStarts("");
            setLengthInWDays(0);
        }
        setAtPrjEnd(checked);
    }

    function handleTargetEndDateChange(date: string | null) {
        if (date) {
            setAtPrjEnd(false);
            setEndDate(dayjs(date).valueOf());
            setWhenPhaseEnds("");
            setWhenPhaseStarts("");
            setLengthInWDays(0);
        }
    }

    function handleAfterPhaseEnds(phaseGuid: string) {
        setWhenPhaseEnds(phaseGuid);
        setWhenPhaseStarts("");
        setLengthInWDays(0);
        setAtPrjEnd((prev) => (prev === true ? false : prev));
        setEndDate((prev) => (prev !== 0 ? 0 : prev));
    }

    function handleAfterPhaseStarts(phaseGuid: string) {
        setWhenPhaseStarts(phaseGuid);
        setWhenPhaseEnds("");
        setLengthInWDays(0);
        setAtPrjEnd((prev) => (prev === true ? false : prev));
        setEndDate((prev) => (prev !== 0 ? 0 : prev));
    }

    function handleWorkingDaysChange(value: number) {
        if (value > 0) {
            setAtPrjEnd(false);
            setEndDate(0);
            setWhenPhaseEnds("");
            setWhenPhaseStarts("");
            setOffsetInDays(0);
        }
        setLengthInWDays(value);
    }

    function handleSave() {
        const nend: IPhaseEnd = {
            atProjectEnd: atPrjEnd,
            ts: endDate > 0 ? endDate : undefined,
            whenPhaseGuidEnds: whenPhaseEnds !== "" ? whenPhaseEnds : undefined,
            whenPhaseGuidStarts: whenPhaseStarts !== "" ? whenPhaseStarts : undefined,
            lengthInWorkingDays: lengthInWDays > 0 ? lengthInWDays : undefined,
            offsetInDays: offsetInDays !== undefined && offsetInDays !== 0 ? offsetInDays : undefined,
        };

        console.log("Saving new phase end time:", nend);

        props.onSave(nend);
    }

    const validPhases = props.project.phases.filter((p) => p.guid !== props.phase.guid);

    return (
        <>
            <Flex align="center" justify="space-between" style={{ height: "3rem" }}>
                <Text size="xl">Modify when the phase ends</Text>
                <Box style={{ height: "100%" }}>
                    <Button variant="outline" onClick={props.onCancel} mr="sm" style={{ height: "100%" }}>
                        <IconCancel size={20} />
                    </Button>
                    <Button variant="contained" onClick={handleSave} style={{ height: "100%" }} disabled={!valid}>
                        <IconCheck size={20} />
                    </Button>
                </Box>
            </Flex>
            <Flex align="center" justify="space-between" gap="md" style={{ height: "5rem" }} wrap="wrap">
                <Box>
                    <Switch
                        label="At project end"
                        checked={atPrjEnd}
                        onChange={(event) => handleToggleAtProjectEnd(event.currentTarget.checked)}
                    />
                </Box>

                <Box>
                    <DatePickerInput
                        placeholder="Select date"
                        label="End at date"
                        value={endDate > 0 ? dayjs(endDate).format("YYYY-MM-DD") : null}
                        onChange={(date) => handleTargetEndDateChange(date)}
                    />
                </Box>

                <Box>
                    <NumberInput
                        label="Length in working days"
                        value={lengthInWDays}
                        onChange={(value) =>
                            handleWorkingDaysChange(typeof value === "string" ? parseInt(value) : value)
                        }
                    />
                </Box>

                <Box>
                    <Select
                        data={validPhases.map((p) => ({ value: p.guid, label: p.name }))}
                        label="When Phase Ends"
                        placeholder="Select a phase"
                        value={whenPhaseEnds !== "" ? whenPhaseEnds : null}
                        onChange={(val) => handleAfterPhaseEnds(val || "")}
                    />
                </Box>

                <Box>
                    <Select
                        data={validPhases.map((p) => ({ value: p.guid, label: p.name }))}
                        label="When Phase Starts"
                        placeholder="Select a phase"
                        value={whenPhaseStarts !== "" ? whenPhaseStarts : null}
                        onChange={(val) => handleAfterPhaseStarts(val || "")}
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
                <Alert variant="light" color="red" title="Invalid end time configuration" mt="md">
                    Please specify at least one end time option.
                </Alert>
            )}
        </>
    );
};

export default EndTimeEditor;
