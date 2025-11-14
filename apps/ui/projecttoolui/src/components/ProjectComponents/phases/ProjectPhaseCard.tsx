import { Button, Card, Divider, Flex, Text, Title } from "@mantine/core";
import { getTimeStampFromPhaseTime, IPhase, IPhaseTime, IProject } from "@frosttroll/projecttoolmodels";
import TextInputEdit from "../../TextInputEdit/TextInputEdit";
import {
    actionRemovePhaseFromActiveProject,
    actionUpdateProjectPhaseInActiveProject,
} from "../../../stores/activeproject/activeProjectActions";
import { DateTime } from "luxon";
import { IconArrowBarRight, IconArrowBarToRight, IconTrash } from "@tabler/icons-react";

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

    return (
        <Card mb="md">
            <Flex justify="space-between" align="center" mb="sm">
                <TextInputEdit value={phase.name} onChange={handlePhaseNameChange}>
                    <Title order={4}>{phase.name}</Title>
                </TextInputEdit>

                <Button
                    variant="filled"
                    color="red"
                    size="sm"
                    onClick={handleRemovePhase}
                    disabled={project.phases.length <= 1}
                >
                    <IconTrash />
                </Button>
            </Flex>

            <Divider my="xs" />

            <Flex gap="lg" align="center" justify="space-between">
                <Flex gap="md" align="center">
                    <IconArrowBarRight size={48} />

                    <Text size="xl" fw="bold">
                        <ProjectPhaseTimeAsDate project={project as IProject} time={phase.start} phase={phase} />
                    </Text>
                </Flex>

                <Flex align="center">
                    {phase.end.lengthInDays !== undefined && <Text>Duration: {phase.end.lengthInDays} days</Text>}
                    {phase.end.lengthInWorkingDays !== undefined && (
                        <Text>Duration: {phase.end.lengthInWorkingDays} working days</Text>
                    )}
                </Flex>

                <Flex gap="md" align="center">
                    <Text size="xl" fw="bold">
                        <ProjectPhaseTimeAsDate project={project as IProject} time={phase.end} phase={phase} />
                    </Text>
                    <IconArrowBarToRight size={48} />
                </Flex>
            </Flex>
        </Card>
    );
};

export default ProjectPhaseCard;

const ProjectPhaseTimeAsDate = (props: {
    project: IProject;
    phase: IPhase;
    time: IPhaseTime;
    format?: Intl.DateTimeFormatOptions;
}) => {
    const ts = getTimeStampFromPhaseTime(props.time, props.project);

    if (!ts) {
        return <>No time defined</>;
    }
    const timeformat = props.format ? props.format : DateTime.DATE_SHORT;

    return DateTime.fromMillis(ts).setLocale("fi").toLocaleString(timeformat);

    // console.log(
    //     "ProjectPhaseTimeDisplay ts:",
    //     ts,
    //     DateTime.fromMillis(ts ?? 0)
    //         .setLocale("fi")
    //         .toLocaleString(DateTime.DATETIME_FULL)
    // );

    // if (props.time.atProjectStart) {
    //     const tsStr = DateTime.fromMillis(props.project.start).setLocale("fi").toLocaleString(DateTime.DATE_SHORT);
    //     return (
    //         <>
    //             {tsStr} <span style={{ fontSize: "0.8em" }}>at project start</span>
    //         </>
    //     );
    // }

    // if (props.time.ts) {
    //     const tsStr = DateTime.fromMillis(props.time.ts).setLocale("fi").toLocaleString(DateTime.DATE_SHORT);
    //     return <>{tsStr}</>;
    // }

    // if (props.time.lengthInDays) {
    //     const startTs = props.phase.start.ts ? props.phase.start.ts : props.project.start;
    //     const tsStr = DateTime.fromMillis(startTs)
    //         .plus({ days: props.time.lengthInDays })
    //         .setLocale("fi")
    //         .toLocaleString(DateTime.DATE_SHORT);
    //     return (
    //         <>
    //             Length: {props.time.lengthInDays}d <span style={{ fontSize: "0.8em" }}>{tsStr}</span>
    //         </>
    //     );
    // }

    return "No time defined";
};
