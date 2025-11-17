// IMPORT: General Libraries
import { useSnapshot } from "valtio";
import { Box, NumberFormatter, Stack, Text, Title } from "@mantine/core";
import { DateTime } from "luxon";

// IMPORT: Stores and Actions
import activeProjectStore from "../../stores/activeproject/activeProjectStore";

// IMPORT: Common Models, Data and Utils
import { IProject, utilGetPhaseEndTs, utilGetPhaseStartTs } from "@frosttroll/projecttoolmodels";

import "./project-phase-bar.css";

/**
 * Type definition for a phase part in the phase bar.
 * Each part consists of:
 * - start: number (percentage of time from the project start)
 * - size: number (percentage of the total project duration)
 * - name: string (name of the phase)
 * - isUnassigned: boolean (indicates if the part is unassigned time)
 * - hasOverlap: number (indicates if the percentage of time overlaps with another phase)
 */
export type PhasePart = [number, number, string, boolean, number];

const ProjectPhaseBar = () => {
    const aps = useSnapshot(activeProjectStore);

    const [phaseParts, totalPhaseDuration] = usePhaseParts();

    const prj = aps.project as IProject;
    if (!prj) {
        return null;
    }

    const colors = ["blue-9", "lime-9", "orange-9", "green-9", "red-9", "teal-9", "yellow-9", "pink-9", "grape-9", "cyan-9"];

    return (
        <>
            <Title order={4} mb="sm">
                <NumberFormatter value={totalPhaseDuration} decimalScale={1} suffix="%" /> of project time allocated to
                phases
            </Title>
            <Stack gap="0" className="phase-bar-container">
                {phaseParts.map(([start, size, name, isUnassigned, overlap], index) => {
                    const color = isUnassigned ? "gray-8" : colors[index % colors.length];
                    const classes = ["phase-bar-part"];
                    if (isUnassigned) {
                        classes.push("unassigned");
                    }
                    if (overlap !== 0) {
                        classes.push("overlap");
                    }
                    return (
                        <Box
                            key={index}
                            className={classes.join(" ")}
                            style={{
                                width: `${size}%`,
                                marginLeft: `${start}%`,
                                backgroundColor: `var(--mantine-color-${color})`,
                            }}
                        >
                            {name && <Text className="name">{name}</Text>}
                            <NumberFormatter value={size} decimalScale={1} suffix="%" className="percentage" />
                        </Box>
                    );
                })}
            </Stack>
        </>
    );
};
export default ProjectPhaseBar;

const usePhaseParts = (): [PhasePart[], number] => {
    const aps = useSnapshot(activeProjectStore);

    const prj = aps.project as IProject;
    if (!prj) {
        return [[], 0];
    }

    const projectDuration = prj.end - prj.start;

    const phaseSizes: PhasePart[] = prj.phases.reduce((parts, phase, index) => {
        const startTs = utilGetPhaseStartTs(phase, prj);
        const endTs = utilGetPhaseEndTs(phase, prj);

        const startPercent = ((startTs - prj.start) / projectDuration) * 100;

        if (index === 0) {
            const phStr = DateTime.fromMillis(startTs).toLocaleString(DateTime.DATE_SHORT);
            const prjStr = DateTime.fromMillis(prj.start).toLocaleString(DateTime.DATE_SHORT);
            if (phStr !== prjStr) {
                const initialDuration = startTs - prj.start;
                const initialPercent = (initialDuration / projectDuration) * 100;
                parts.push([0, initialPercent, "", true, 0]);
            }
        }

        let overlap = 0;
        if (index > 0) {
            const phStr = DateTime.fromMillis(startTs).toLocaleString(DateTime.DATE_SHORT);
            const prevPhaseEndTs = utilGetPhaseEndTs(prj.phases[index - 1], prj);
            const prevPhStr = DateTime.fromMillis(prevPhaseEndTs).toLocaleString(DateTime.DATE_SHORT);
            if (phStr !== prevPhStr && startTs > prevPhaseEndTs) {
                const gapDuration = startTs - prevPhaseEndTs;
                const gapPercent = (gapDuration / projectDuration) * 100;
                parts.push([startPercent - gapPercent, gapPercent, "", true, 0]);
            }
            if (startTs < prevPhaseEndTs) {
                overlap = ((prevPhaseEndTs - startTs) / projectDuration) * 100;
            }
        }

        const phaseDuration = endTs - startTs;
        const phasePercent = (phaseDuration / projectDuration) * 100;

        parts.push([startPercent, phasePercent, phase.name, false, overlap]);
        return parts;
    }, [] as PhasePart[]);

    const totalPhaseDuration = phaseSizes.reduce((acc, [, size, , isUnassigned]) => {
        // if(!isUnassigned) console.log(`S: ${size}\nO: ${overlap}\nSUM: ${size - overlap}\nACC Before ${acc}\nACC After ${acc + (size )}`);
        return acc + (isUnassigned ? 0 : size);
    }, 0);

    return [phaseSizes, totalPhaseDuration];
};
