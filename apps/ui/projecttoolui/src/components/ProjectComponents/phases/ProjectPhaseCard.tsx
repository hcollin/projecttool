import { Box, Button, Card, Divider, Flex, Stack, Text, Title } from "@mantine/core";
import {
    IPhase,
    IPhaseEnd,
    IPhaseStart,
    IProject,
    IRole,
    ROLESENIORITY,
    utilGetPhaseEndTs,
    utilGetPhaseStartTs,
} from "@frosttroll/projecttoolmodels";
import TextInputEdit from "../../TextInputEdit/TextInputEdit";
import {
    actionAddRoleAllocationToPhaseInActiveProject,
    actionRemovePhaseFromActiveProject,
    actionUpdateProjectPhaseInActiveProject,
} from "../../../stores/activeproject/activeProjectActions";
import { IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import EndSlider from "../../EndSlider/EndSlider";
import { useState } from "react";
import dayjs from "dayjs";
import { DateTime } from "luxon";
import EndTimeEditor from "./EndTimeEditor";
import StartTimeEditor from "./StartTimeEditor";

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

    const startTs = utilGetPhaseStartTs(phase, project);
    const endTs = utilGetPhaseEndTs(phase, project);

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
                <Flex gap="lg" align="flex-start" justify="flex-start" style={{ height: "5.5rem" }}>
                    <Flex style={{ height: "100%", width: "25%" }} flex="0 0 auto" justify="space-between">
                        <Box mr="md">
                            <Text size="md" c="gray.6">
                                Phase starts
                            </Text>
                            <ProjectStartTime start={start} project={project} />
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

                    <Flex style={{ height: "100%", width: "25%" }} flex="0 0 auto" justify="space-between">
                        <Box mr="md">
                            <Text size="md" c="gray.6">
                                Phase ends
                            </Text>
                            <ProjectEndTime end={end} project={project} />
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

                    <Box flex="1 1 auto" style={{ width: "50%" }}>
                        <Text size="md" c="gray.6">
                            Phase time info
                        </Text>
                        <Flex align="center" gap="xs">
                            <Text size="lg">
                                {DateTime.fromMillis(startTs).setLocale("fi").toLocaleString(DateTime.DATE_SHORT)}
                            </Text>
                            <Text size="md">-</Text>
                            <Text size="lg">
                                {DateTime.fromMillis(endTs).setLocale("fi").toLocaleString(DateTime.DATE_SHORT)}
                            </Text>
                        </Flex>
                    </Box>
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
            <Box style={{ flex: "0 0 auto", width: "25%" }}>
                <Text
                    size="lg"
                    
                    fw={hasAlloc ? "bold" : "normal"}
                    c={hasAlloc ? "var(--mantine-primary-color)" : "gray.6"}
                >
                    {role.seniority !== ROLESENIORITY.MIDLEVEL ? role.seniority + " " : ""}
                    {role.name}
                </Text>
                <Text size="xs" style={{opacity: 0.5}}>{role.guid}</Text>
            </Box>

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

const ProjectStartTime = (props: { start: IPhaseStart; project: IProject }) => {
    const { start, project } = props;

    const OffSet =
        start.offsetInDays !== undefined && start.offsetInDays !== 0 ? (
            <Text size="lg">
                <span style={{ fontSize: "0.9em" }}>Offset:</span> {start.offsetInDays} days
            </Text>
        ) : null;

    if (start.atProjectStart) {
        return (
            <>
                <Text size="lg">
                    At project start{" "}
                    <span style={{ fontSize: "0.9em" }}>{dayjs(project.start).format("DD.MM.YYYY")}</span>
                </Text>
                {OffSet !== null && OffSet}
            </>
        );
    }

    if (start.afterPhaseGuid) {
        return (
            <>
                <Text size="lg">
                    <span style={{ fontSize: "0.9em" }}>After:</span>{" "}
                    {project.phases.find((p) => p.guid === start.afterPhaseGuid)?.name || "INVALID PHASE"}
                </Text>
                {OffSet !== null && OffSet}
            </>
        );
    }

    if (start.ts && start.ts > 0) {
        return (
            <>
                <Text size="lg">{dayjs(start.ts).format("DD.MM.YYYY")}</Text>
                {OffSet !== null && OffSet}
            </>
        );
    }

    return <Text size="lg">No start time defined</Text>;
};

const ProjectEndTime = (props: { end: IPhaseEnd; project: IProject }) => {
    const { end, project } = props;

    const OffSet =
        end.offsetInDays && end.offsetInDays > 0 ? (
            <Text size="lg">
                <span style={{ fontSize: "0.9em" }}>Offset:</span> {end.offsetInDays} days
            </Text>
        ) : null;

    if (end.atProjectEnd) {
        return (
            <>
                <Text size="lg">
                    At project end{" "}
                    <span style={{ fontSize: "0.9em" }}>
                        {DateTime.fromMillis(project.end).setLocale("fi").toLocaleString(DateTime.DATE_SHORT)}
                    </span>
                </Text>
                {OffSet !== null && OffSet}
            </>
        );
    }

    if (end.ts) {
        return (
            <>
                <Text size="lg">{dayjs(end.ts).format("DD.MM.YYYY")}</Text>
                {OffSet !== null && OffSet}
            </>
        );
    }

    if (end.whenPhaseGuidEnds) {
        return (
            <>
                <Text size="lg">
                    <span style={{ fontSize: "0.9em" }}>After:</span>{" "}
                    {project.phases.find((p) => p.guid === end.whenPhaseGuidEnds)?.name || "INVALID PHASE"}
                </Text>
                {OffSet !== null && OffSet}
            </>
        );
    }

    if (end.whenPhaseGuidStarts) {
        return (
            <>
                <Text size="lg">
                    <span style={{ fontSize: "0.9em" }}>Before:</span>{" "}
                    {project.phases.find((p) => p.guid === end.whenPhaseGuidStarts)?.name || "INVALID PHASE"}
                </Text>
                {OffSet !== null && OffSet}
            </>
        );
    }
    if (end.lengthInWorkingDays && end.lengthInWorkingDays > 0) {
        return (
            <Text size="lg">
                <span style={{ fontSize: "0.9em" }}>Days:</span> {end.lengthInWorkingDays} working days
            </Text>
        );
    }

    return <Text size="lg">No end time defined</Text>;
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
