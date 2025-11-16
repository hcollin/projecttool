import { Box, Button, Card, Divider, Flex, Stack, Text, Title } from "@mantine/core";
import { IPhase, IProject, IRole, ROLESENIORITY } from "@frosttroll/projecttoolmodels";
import TextInputEdit from "../../TextInputEdit/TextInputEdit";
import {
	actionAddRoleAllocationToPhaseInActiveProject,
	actionRemovePhaseFromActiveProject,
	actionUpdateProjectPhaseInActiveProject,
} from "../../../stores/activeproject/activeProjectActions";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import EndSlider from "../../EndSlider/EndSlider";

interface ProjectPhaseCardProps {
	phase: IPhase;
	project: IProject;
}

const ProjectPhaseCard = ({ phase, project }: ProjectPhaseCardProps) => {
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

	const start = phase.start;
	const end = phase.end;

	return (
		<Card mb="md">
			<Flex justify="space-between" align="center" mb="sm">
				<TextInputEdit value={phase.name} onChange={handlePhaseNameChange}>
					<Title order={4}>{phase.name}</Title>
				</TextInputEdit>

				<Button variant="filled" color="red" size="sm" onClick={handleRemovePhase} disabled={project.phases.length <= 1}>
					<IconTrash />
				</Button>
			</Flex>

			<Divider my="xs" />

			<Flex gap="lg" align="center" justify="flex-start">
				<Flex>
					<Box mr="md">
						<Text size="md">Start</Text>
						{start.atProjectStart && <Text size="lg">{phase.start.atProjectStart ? "At project start" : ""}</Text>}
					</Box>

					<Button variant="filled" size="xs" style={{ height: "auto" }}>
						<IconEdit size="20" />
					</Button>
				</Flex>

				<Flex>
					<Box mr="md">
						<Text size="md">End</Text>
						{end.atProjectEnd && <Text size="lg">{phase.end.atProjectEnd ? "At project end" : ""}</Text>}
					</Box>
					<Button variant="filled" size="xs" style={{ height: "auto" }}>
						<IconEdit size="20" />
					</Button>
				</Flex>
			</Flex>

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
