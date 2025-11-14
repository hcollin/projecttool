import { convertRoleTemplateToRole, IRole, IRoleTemplate, ROLESENIORITY } from "@frosttroll/projecttoolmodels";
import DataPicker from "../../DataPicker/DataPicker";
import { EIconSet } from "../../Icons/IconSet";
import ProjectCard from "../ProjectCard";
import ProjectCardHeader from "../ProjectCardHeader";
import { useState } from "react";
import { useSnapshot } from "valtio";
import dataRolesStore from "../../../stores/data/roles/dataRolesStore";
import userStore from "../../../stores/user/userStore";
import {
    actionAddNewRoleToActiveProject,
    actionRemoveRoleFromActiveProject,
    actionUpdateRoleInActiveProject,
} from "../../../stores/activeproject/activeProjectActions";
import activeProjectStore from "../../../stores/activeproject/activeProjectStore";
import { Box, Button, Flex, Select, Stack, Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

const ProjectResourceRoleCard = () => {
    const drs = useSnapshot(dataRolesStore);

    const usr = useSnapshot(userStore);

    const apr = useSnapshot(activeProjectStore);

    const [isDataPickerOpen, setDataPickerOpen] = useState(false);

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

    const project = apr.project;
    if (!project) {
        return null;
    }

    return (
        <>
            <ProjectCardHeader
                label="Roles"
                dataType={EIconSet.USER}
                addNewAction={() => {
                    console.log("ADD NEW ROLE!");
                    setDataPickerOpen(true);
                }}
            />
            <DataPicker<IRoleTemplate>
                title="Select a role"
                columns={4}
                modalSize="90%"
                isOpen={isDataPickerOpen}
                onClose={() => setDataPickerOpen(false)}
                options={drs.roles as IRoleTemplate[]}
                valueKey="name"
                onSelectOption={handleAddNewRole}
            />
            <ProjectCard>
                <Stack gap="sm">
                    {apr.project?.roles?.map((role, i) => {
                        const rt = drs.roles.find((r) => r.id === role.templateId);
                        return (
                            <Flex key={i} align="center">
                                <Title order={4} style={{ flex: "0 0 auto", width: "25%" }}>
                                    {role.seniority && role.seniority !== ROLESENIORITY.MIDLEVEL
                                        ? role.seniority + " "
                                        : ""}
                                    {role.name}
                                </Title>

                                <Box style={{ flex: "0 0 auto", width: "15%", paddingRight: "1rem" }}>
                                    <Select
                                        placeholder="No seniority"
                                        data={rt?.seniorities}
                                        value={role.seniority}
                                        onChange={(value) => {
                                            handleChangeSeniority(role, value as ROLESENIORITY);
                                        }}
                                    />
                                </Box>

                                <Box style={{ flex: "0 0 auto", width: "15%", paddingRight: "1rem" }}>
                                    <Select
                                        placeholder="No pricegroup"
                                        data={project.prices.hourlypricegroups.map((pg) => ({
                                            value: pg.guid,
                                            label: `${pg.name} (${pg.price} ${pg.currency})`,
                                        }))}
                                        value={role.priceGroupId}
                                        onChange={(value) => {
                                            handleUpdatePriceGroup(role, value);
                                        }}
                                    />
                                </Box>

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
                        );
                    })}
                </Stack>
            </ProjectCard>
        </>
    );
};

export default ProjectResourceRoleCard;
