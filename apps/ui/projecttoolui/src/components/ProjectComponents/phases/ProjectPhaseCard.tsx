import {
    Alert,
    Box,
    Button,
    Card,
    Divider,
    Flex,
    NumberInput,
    Select,
    Stack,
    Switch,
    Text,
    Title,
} from "@mantine/core";
import { IPhase, IPhaseEnd, IPhaseStart, IProject, IRole, ROLESENIORITY } from "@frosttroll/projecttoolmodels";
import TextInputEdit from "../../TextInputEdit/TextInputEdit";
import {
    actionAddRoleAllocationToPhaseInActiveProject,
    actionRemovePhaseFromActiveProject,
    actionUpdateProjectPhaseInActiveProject,
} from "../../../stores/activeproject/activeProjectActions";
import { IconCancel, IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import EndSlider from "../../EndSlider/EndSlider";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { DateTime } from "luxon";

interface ProjectPhaseCardProps {
    phase: IPhase;
    project: IProject;
    onClose?: () => void;
}

const ProjectPhaseCard = ({ phase, project, onClose }: ProjectPhaseCardProps) => {
    const [editTimeMode, setEditTimeMode] = useState<{ start: boolean; end: boolean }>({ start: false, end: false });

    function handlePhaseNameChange(newName: string) {
        actionUpdateProjectPhaseInActiveProject({ ...phase, name: newName });
    }

    function handleRemovePhase() {
        if (project.phases.length > 1) {
            actionRemovePhaseFromActiveProject(phase.guid);
        }
    }

    function handleAllocationChange(roleGuid: string, value: number) {
        actionAddRoleAllocationToPhaseInActiveProject(phase.guid, roleGuid, value);
    }

    function handleEditStartTime(newStart: IPhaseStart) {
        actionUpdateProjectPhaseInActiveProject({ ...phase, start: newStart });
        setEditTimeMode({ start: false, end: false });
    }

    function handleEditEndTime(newEnd: IPhaseEnd) {
        actionUpdateProjectPhaseInActiveProject({ ...phase, end: newEnd });
        setEditTimeMode({ start: false, end: false });
    }

    const start = phase.start;
    const end = phase.end;

    return (
        <Card mb="md">
            <Flex justify="space-between" align="center" mb="sm">
                <TextInputEdit value={phase.name} onChange={handlePhaseNameChange}>
                    <Title order={4}>{phase.name}</Title>
                </TextInputEdit>
                <Box>
                    <Button
                        variant="filled"
                        color="red"
                        size="sm"
                        onClick={handleRemovePhase}
                        disabled={project.phases.length <= 1}
                    >
                        <IconTrash />
                    </Button>

                    {onClose && (
                        <Button variant="outline" size="sm" ml="sm" onClick={onClose}>
                            <IconX />
                        </Button>
                    )}
                </Box>
            </Flex>

            <Divider my="xs" />

            {editTimeMode.start && (
                <StartTimeEditor
                    phase={phase}
                    project={project}
                    onSave={handleEditStartTime}
                    onCancel={() => setEditTimeMode({ start: false, end: false })}
                />
            )}

            {editTimeMode.end && (
                <EndTimeEditor
                    phase={phase}
                    project={project}
                    onSave={handleEditEndTime}
                    onCancel={() => setEditTimeMode({ start: false, end: false })}
                />
            )}

            {editTimeMode.start === false && editTimeMode.end === false && (
                <Flex gap="lg" align="center" justify="flex-start">
                    <Flex>
                        <Box mr="md">
                            <Text size="md">Start</Text>
                            {start.atProjectStart && (
                                <Text size="lg">
                                    At project start{" "}
                                    <span style={{ fontSize: "0.9em" }}>
                                        {dayjs(project.start).format("DD.MM.YYYY")}
                                    </span>
                                </Text>
                            )}
                            {start.afterPhaseGuid && (
                                <Text size="lg">
                                    <span style={{ fontSize: "0.9em" }}>After:</span>{" "}
                                    {project.phases.find((p) => p.guid === start.afterPhaseGuid)?.name ||
                                        "INVALID PHASE"}
                                </Text>
                            )}
                            {start.ts && start.ts > 0 && <Text size="lg">{dayjs(start.ts).format("DD.MM.YYYY")}</Text>}

                            {start.offsetInDays !== undefined && start.offsetInDays !== 0 && (
                                <Text size="lg">
                                    <span style={{ fontSize: "0.9em" }}>Offset:</span> {start.offsetInDays} days
                                </Text>
                            )}
                        </Box>

                        <Button
                            variant="filled"
                            size="xs"
                            style={{ height: "auto" }}
                            onClick={() => setEditTimeMode({ start: true, end: false })}
                        >
                            <IconEdit size="20" />
                        </Button>
                    </Flex>

                    <Flex>
                        <Box mr="md">
                            <Text size="md">End</Text>
                            {end.atProjectEnd && (
                                <Text size="lg">
                                    At project end{" "}
                                    <span style={{ fontSize: "0.9em" }}>
                                        {DateTime.fromMillis(project.end)
                                            .setLocale("fi")
                                            .toLocaleString(DateTime.DATE_SHORT)}
                                    </span>
                                </Text>
                            )}
                            {end.ts && <Text size="lg">{dayjs(end.ts).format("DD.MM.YYYY")}</Text>}
                            {end.whenPhaseGuidEnds && (
                                <Text size="lg">
                                    <span style={{ fontSize: "0.9em" }}>After:</span>{" "}
                                    {project.phases.find((p) => p.guid === end.whenPhaseGuidEnds)?.name ||
                                        "INVALID PHASE"}
                                </Text>
                            )}
                            {end.whenPhaseGuidStarts && (
                                <Text size="lg">
                                    <span style={{ fontSize: "0.9em" }}>Before:</span>{" "}
                                    {project.phases.find((p) => p.guid === end.whenPhaseGuidStarts)?.name ||
                                        "INVALID PHASE"}
                                </Text>
                            )}
                        </Box>
                        <Button
                            variant="filled"
                            size="xs"
                            style={{ height: "auto" }}
                            onClick={() => setEditTimeMode({ start: false, end: true })}
                        >
                            <IconEdit size="20" />
                        </Button>
                    </Flex>
                </Flex>
            )}

            <Divider my="xs" />

            <Stack>
                {project.roles.map((role) => {
                    return (
                        <PhaseRoleAllocation
                            key={role.guid}
                            phase={phase}
                            role={role}
                            onChange={(value) => {
                                handleAllocationChange(role.guid, value);
                            }}
                        />
                    );
                })}
            </Stack>
        </Card>
    );
};

export default ProjectPhaseCard;

const PhaseRoleAllocation = (props: { phase: IPhase; role: IRole; onChange: (value: number) => void }) => {
    const { phase, role } = props;

    const alloc = phase.allocations.find((a) => a.roleGuid === role.guid);

    const hasAlloc = alloc !== undefined && alloc.allocation > 0;

    return (
        <Flex key={role.guid} align="center" justify="space-between">
            <Text
                size="lg"
                style={{ flex: "0 0 auto", width: "25%" }}
                fw={hasAlloc ? "bold" : "normal"}
                c={hasAlloc ? "var(--mantine-primary-color)" : "gray.6"}
            >
                {role.seniority !== ROLESENIORITY.MIDLEVEL ? role.seniority + " " : ""}
                {role.name}
            </Text>

            <Flex style={{ flex: 1, marginLeft: "1rem", marginRight: "1rem" }}>
                <Button variant="filled" size="xs" mr="sm" onClick={() => props.onChange(0)} disabled={!hasAlloc}>
                    MIN
                </Button>
                <EndSlider
                    initialValue={alloc ? alloc.allocation : 0}
                    onDone={props.onChange}
                    min={0}
                    max={100}
                    step={5}
                    style={{ flex: 1 }}
                    marks={allowMarks}
                />
                <Button variant="filled" size="xs" ml="md" onClick={() => props.onChange(100)}>
                    MAX
                </Button>
            </Flex>
            <Box style={{ flex: "0 0 auto", width: "6rem", textAlign: "right" }}>
                <Title order={5}>{alloc ? alloc.allocation : 0}%</Title>
                <Title order={6}>{alloc ? (5 / 100) * alloc.allocation : 0} d/week</Title>
            </Box>
        </Flex>
    );
};

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
            <Flex align="center" justify="space-between" gap="md" style={{ height: "5rem" }}>
                <Text size="sm">Start time:</Text>
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

                <Box style={{ height: "100%" }}>
                    <Button variant="outline" onClick={props.onCancel} mr="sm" style={{ height: "100%" }}>
                        <IconCancel size={20} />
                    </Button>
                    <Button variant="contained" onClick={handleSave} style={{ height: "100%" }} disabled={!valid}>
                        <IconCheck size={20} />
                    </Button>
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
    const [whenPhaseStarts, setWhenPhaseStarts] = useState<string>(end.whenPhaseGuidStarts || "");
    const [offsetInDays, setOffsetInDays] = useState<number>(end.offsetInDays || 0);

    let valid = false;
    if (atPrjEnd) {
        valid = true;
    } else if (endDate > 0) {
        valid = true;
    } else if (whenPhaseEnds !== "") {
        valid = true;
    }

    function handleToggleAtProjectEnd(checked: boolean) {
        if (checked) {
            setEndDate(0);
            setWhenPhaseEnds("");
            setWhenPhaseStarts("");
        }
        setAtPrjEnd(checked);
    }

    function handleTargetEndDateChange(date: string | null) {
        if (date) {
            setAtPrjEnd(false);
            setEndDate(dayjs(date).valueOf());
            setWhenPhaseEnds("");
            setWhenPhaseStarts("");
        }
    }

    function handleAfterPhaseEnds(phaseGuid: string) {
        setWhenPhaseEnds(phaseGuid);
        setWhenPhaseStarts("");
        setAtPrjEnd((prev) => (prev === true ? false : prev));
        setEndDate((prev) => (prev !== 0 ? 0 : prev));
    }

    function handleAfterPhaseStarts(phaseGuid: string) {
        setWhenPhaseStarts(phaseGuid);
        setWhenPhaseEnds("");
        setAtPrjEnd((prev) => (prev === true ? false : prev));
        setEndDate((prev) => (prev !== 0 ? 0 : prev));
    }

    function handleSave() {
        const nend: IPhaseEnd = {
            atProjectEnd: atPrjEnd,
            ts: endDate > 0 ? endDate : undefined,
            whenPhaseGuidEnds: whenPhaseEnds !== "" ? whenPhaseEnds : undefined,
            whenPhaseGuidStarts: whenPhaseStarts !== "" ? whenPhaseStarts : undefined,
            offsetInDays: offsetInDays !== undefined && offsetInDays !== 0 ? offsetInDays : undefined,
        };

        console.log("Saving new phase end time:", nend);

        props.onSave(nend);
    }

    const validPhases = props.project.phases.filter((p) => p.guid !== props.phase.guid);

    console.log("PROJECT END", props.project.end, "\nPHASE END", end);

    return (
        <>
            <Flex align="center" justify="space-between" gap="md" style={{ height: "5rem" }}>
                <Text size="sm">Start time:</Text>
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
                    <Select
                        data={validPhases.map((p) => ({ value: p.guid, label: p.name }))}
                        label="End After phase"
                        placeholder="Select a phase"
                        value={whenPhaseEnds !== "" ? whenPhaseEnds : null}
                        onChange={(val) => handleAfterPhaseEnds(val || "")}
                    />
                </Box>

                <Box>
                    <Select
                        data={validPhases.map((p) => ({ value: p.guid, label: p.name }))}
                        label="End After phase"
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

                <Box style={{ height: "100%" }}>
                    <Button variant="outline" onClick={props.onCancel} mr="sm" style={{ height: "100%" }}>
                        <IconCancel size={20} />
                    </Button>
                    <Button variant="contained" onClick={handleSave} style={{ height: "100%" }} disabled={!valid}>
                        <IconCheck size={20} />
                    </Button>
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

const allowMarks: { value: number; label: string }[] = [
    { value: 0, label: "0%" },
    { value: 20, label: "1d" },
    { value: 25, label: "25%" },
    { value: 40, label: "2d" },
    { value: 50, label: "50%" },
    { value: 60, label: "3d" },
    { value: 75, label: "75%" },
    { value: 80, label: "4d" },
    { value: 100, label: "100%" },
];

// const ProjectPhaseTimeAsDate = (props: { project: IProject; phase: IPhase; time: IPhaseTime; format?: Intl.DateTimeFormatOptions }) => {
// 	const ts = getTimeStampFromPhaseTime(props.time, props.project);

// 	if (!ts) {
// 		return <>No time defined</>;
// 	}
// 	const timeformat = props.format ? props.format : DateTime.DATE_SHORT;

// 	return DateTime.fromMillis(ts).setLocale("fi").toLocaleString(timeformat);

// 	// console.log(
// 	//     "ProjectPhaseTimeDisplay ts:",
// 	//     ts,
// 	//     DateTime.fromMillis(ts ?? 0)
// 	//         .setLocale("fi")
// 	//         .toLocaleString(DateTime.DATETIME_FULL)
// 	// );

// 	// if (props.time.atProjectStart) {
// 	//     const tsStr = DateTime.fromMillis(props.project.start).setLocale("fi").toLocaleString(DateTime.DATE_SHORT);
// 	//     return (
// 	//         <>
// 	//             {tsStr} <span style={{ fontSize: "0.8em" }}>at project start</span>
// 	//         </>
// 	//     );
// 	// }

// 	// if (props.time.ts) {
// 	//     const tsStr = DateTime.fromMillis(props.time.ts).setLocale("fi").toLocaleString(DateTime.DATE_SHORT);
// 	//     return <>{tsStr}</>;
// 	// }

// 	// if (props.time.lengthInDays) {
// 	//     const startTs = props.phase.start.ts ? props.phase.start.ts : props.project.start;
// 	//     const tsStr = DateTime.fromMillis(startTs)
// 	//         .plus({ days: props.time.lengthInDays })
// 	//         .setLocale("fi")
// 	//         .toLocaleString(DateTime.DATE_SHORT);
// 	//     return (
// 	//         <>
// 	//             Length: {props.time.lengthInDays}d <span style={{ fontSize: "0.8em" }}>{tsStr}</span>
// 	//         </>
// 	//     );
// 	// }

// 	return "No time defined";
// };
