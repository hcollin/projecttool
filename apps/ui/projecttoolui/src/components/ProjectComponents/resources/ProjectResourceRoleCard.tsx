import {
    convertRoleTemplateToRole,
    IProject,
    IRole,
    IRoleTemplate,
    ROLESENIORITY,
    utilCurrencyToSymbol,
} from "@frosttroll/projecttoolmodels";

import { EIconSet } from "../../Icons/IconSet";
import ProjectCard from "../ProjectCard";
import ProjectCardHeader from "../ProjectCardHeader";
import { useState } from "react";
import { useSnapshot } from "valtio";
import dataRolesStore, { IDataRolesStore } from "../../../stores/data/roles/dataRolesStore";
import userStore from "../../../stores/user/userStore";
import {
    actionAddNewRoleToActiveProject,
    actionRemoveRoleFromActiveProject,
    actionUpdateRoleInActiveProject,
} from "../../../stores/activeproject/activeProjectActions";
import activeProjectStore from "../../../stores/activeproject/activeProjectStore";
import { Box, Button, Flex, Modal, Select, Stack, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { IconSortAscendingLetters, IconSortAscendingNumbers, IconTrash } from "@tabler/icons-react";
import TextInputEdit from "../../TextInputEdit/TextInputEdit";

const ProjectResourceRoleCard = () => {
    const drs = useSnapshot(dataRolesStore);

    const usr = useSnapshot(userStore);

    const apr = useSnapshot(activeProjectStore);

    const [isDataPickerOpen, setDataPickerOpen] = useState(false);

    const [sortBy, setSortBy] = useState<"default" | "name" | "pricegroup" | "seniority">("default");

    function handleAddNewRole(rolet: IRoleTemplate) {
        setDataPickerOpen(false);
        const role = convertRoleTemplateToRole(rolet, usr.organizationId);

        actionAddNewRoleToActiveProject(role);
    }

    function handleRemoveRole(roleGuid: string) {
        actionRemoveRoleFromActiveProject(roleGuid);
    }

    function handleChangeSeniority(role: IRole, seniority: ROLESENIORITY | null) {
        const updatedRole: IRole = { ...role };
        if (seniority) {
            updatedRole.seniority = seniority;
        } else {
            delete updatedRole.seniority;
        }

        actionUpdateRoleInActiveProject(updatedRole);
    }

    function handleUpdatePriceGroup(role: IRole, priceGroupId: string | null) {
        const updatedRole: IRole = { ...role };
        if (priceGroupId) {
            updatedRole.priceGroupId = priceGroupId;
        } else {
            delete updatedRole.priceGroupId;
        }

        actionUpdateRoleInActiveProject(updatedRole);
    }

    const project = apr.project as IProject;
    if (!project) {
        return null;
    }

    let roles = ((project.roles ? [...project.roles] : []) as IRole[]).map((r) => {
        const template = drs.roles.find((rt) => rt.guid === r.templateId);
        return {
            ...r,
            template: template as IRoleTemplate,
        } as IRole;
    });

    if (sortBy !== "default") {
        roles.sort((a, b) => {
            if (sortBy === "name") {
                return sortRoleByName(a, b);
            } else if (sortBy === "pricegroup") {
                const res = sortRoleByPrice(a, b, project);
                if (res !== 0) return res;
                return sortRoleByName(a, b);
            } else if (sortBy === "seniority") {
                const res = sortBySeniority(a, b);
                if (res !== 0) return res;
                return sortRoleByName(a, b);
            }
            return 0;
        });
    }

    return (
        <>
            <ProjectCardHeader
                label="Roles"
                dataType={EIconSet.USER}
                addNewAction={() => {
                    setDataPickerOpen(true);
                }}
            >
                <Button variant="filled" onClick={() => setSortBy("name")}>
                    Sort by name
                </Button>
                <Button variant="filled" onClick={() => setSortBy("pricegroup")}>
                    Sort by price group
                </Button>
                <Button variant="filled" onClick={() => setSortBy("seniority")}>
                    Sort by seniority
                </Button>
            </ProjectCardHeader>

            <Modal opened={isDataPickerOpen} onClose={() => setDataPickerOpen(false)} title="Select a role" size="90%">
                <RolePickerModal drs={drs as IDataRolesStore} handleAddNewRole={handleAddNewRole} />
            </Modal>
            <ProjectCard noPadding>
                <Stack py="md" gap="0">
                    {roles.map((role, i) => {
                        const rt = drs.roles.find((r) => r.guid === role.templateId);

                        return (
                            <Box key={role.guid} py="xs" px="lg" m="0" style={{ borderBottom: "groove 4px #0004" }}>
                                <Flex key={i} align="center">
                                    <TextInputEdit
                                        style={{ flex: "0 0 auto", width: "33%", paddingRight: "1rem" }}
                                        value={role.name}
                                        onChange={(value) => {
                                            const updatedRole: IRole = {
                                                ...(role as IRole),
                                                name: value,
                                            };
                                            actionUpdateRoleInActiveProject(updatedRole);
                                        }}
                                    >
                                        <Title order={4}>
                                            {role.seniority && role.seniority !== ROLESENIORITY.MIDLEVEL
                                                ? role.seniority + " "
                                                : ""}
                                            {role.name}
                                        </Title>
                                    </TextInputEdit>

                                    <Box style={{ flex: "0 0 auto", width: "15%", paddingRight: "1rem" }}>
                                        <Select
                                            placeholder="No seniority"
                                            data={rt?.seniorities}
                                            value={role.seniority}
                                            onChange={(value) => {
                                                handleChangeSeniority(role as IRole, value as ROLESENIORITY);
                                            }}
                                        />
                                    </Box>

                                    <Box style={{ flex: "0 0 auto", width: "15%", paddingRight: "1rem" }}>
                                        <Select
                                            placeholder="No pricegroup"
                                            allowDeselect={false}
                                            data={project.prices.hourlypricegroups.map((pg) => ({
                                                value: pg.guid,
                                                label: `${pg.name} (${pg.price} ${utilCurrencyToSymbol(project.currency)})`,
                                            }))}
                                            value={role.priceGroupId}
                                            onChange={(value) => {
                                                handleUpdatePriceGroup(role as IRole, value);
                                            }}
                                        />
                                    </Box>
                                    {/* <Text size="xs">{role.guid}</Text> */}

                                    {/* <Text size="xs" style={{ flex: "3 3 auto" }}>
                                    {role.description}
                                </Text> */}

                                    <Box style={{ flex: "1 1 auto", textAlign: "right" }}>
                                        <Button
                                            variant="filled"
                                            size="sm"
                                            color="red"
                                            onClick={() => handleRemoveRole(role.guid)}
                                        >
                                            <IconTrash />
                                        </Button>
                                    </Box>
                                </Flex>

                                <TextInput
                                    label="Description of the role for this project"
                                    value={role.description || ""}
                                    size="xs"
                                    onChange={(e) => {
                                        const updatedRole: IRole = {
                                            ...(role as IRole),
                                            description: e.currentTarget.value,
                                        };
                                        actionUpdateRoleInActiveProject(updatedRole);
                                    }}
                                />
                            </Box>
                        );
                    })}
                </Stack>
            </ProjectCard>
        </>
    );
};

interface RolePickerModalProps {
    drs: IDataRolesStore;
    handleAddNewRole: (rolet: IRoleTemplate) => void;
}
const RolePickerModal = (props: RolePickerModalProps) => {
    const { drs, handleAddNewRole } = props;

    return (
        <Flex gap="0" wrap="wrap">
            {drs.roles.map((rolet, i) => {
                const newGroup = i === 0 || rolet.groups.join(", ") !== (drs.roles[i - 1]?.groups.join(", ") || "");

                return (
                    <>
                        {newGroup && (
                            <Box style={{ flex: `1 1 auto`, width: "100%", borderTop: "ridge 2px #AAA2" }} mt="3px">
                                <Title order={4} c="gray.6">
                                    {rolet.groups.join(", ") || "Others"}
                                </Title>
                            </Box>
                        )}
                        <Tooltip
                            label={rolet.description}
                            withArrow
                            position="top"
                            arrowSize={7}
                            multiline
                            openDelay={300}
                            w={300}
                        >
                            <Button
                                variant="filled"
                                size="lg"
                                mr="md"
                                mb="sm"
                                style={{
                                    whiteSpace: "normal",
                                    textAlign: "center",
                                    height: "3rem",
                                    width: "18%",
                                    fontSize: "1rem",
                                    flex: "0 0 auto",
                                }}
                                key={rolet.guid}
                                onClick={() => handleAddNewRole(rolet as IRoleTemplate)}
                            >
                                {rolet.name}
                            </Button>
                        </Tooltip>
                    </>
                );
            })}
        </Flex>
    );
};

export default ProjectResourceRoleCard;

function sortRoleByName(a: IRole, b: IRole): number {
    return a.name.localeCompare(b.name);
}

function sortRoleByPrice(a: IRole, b: IRole, project: IProject): number {
    const aPg = project.prices.hourlypricegroups.find((pg) => pg.guid === a.priceGroupId);
    const bPg = project.prices.hourlypricegroups.find((pg) => pg.guid === b.priceGroupId);
    const aPrice = aPg ? aPg.price : 0;
    const bPrice = bPg ? bPg.price : 0;

    if (aPrice === bPrice) {
        return sortBySeniority(a, b);
    }

    return bPrice - aPrice;
}

function sortBySeniority(a: IRole, b: IRole): number {
    const seniorityOrder: ROLESENIORITY[] = [
        ROLESENIORITY.INTERN,
        ROLESENIORITY.JUNIOR,
        ROLESENIORITY.MIDLEVEL,
        ROLESENIORITY.SENIOR,
        ROLESENIORITY.LEAD,
        ROLESENIORITY.PRINCIPAL,
    ];

    const aIndex = a.seniority ? seniorityOrder.indexOf(a.seniority) * 10 : -10;
    const bIndex = b.seniority ? seniorityOrder.indexOf(b.seniority) * 10 : -10;

    const aPoints = calcRolePoints(a) + aIndex;
    const bPoints = calcRolePoints(b) + bIndex;

    return bPoints - aPoints;
}

function calcRolePoints(role: IRole): number {
    let points = 0;
    if (role.template) {
        points += role.template.groups.includes("Management") ? 5 : 0;
        points += role.template.groups.includes("Architecture") ? 3 : 0;
        points += role.template.groups.includes("Design") ? 2 : 0;
        points += role.template.groups.includes("Data") ? 2 : 0;
    }

    return points;
}
