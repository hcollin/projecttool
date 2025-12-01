import { convertRoleTemplateToRole, IRole, IRoleTemplate, ROLESENIORITY, utilCurrencyToSymbol } from "@frosttroll/projecttoolmodels";

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
import { Box, Button, Flex, Modal, Select, Stack, Title, Tooltip } from "@mantine/core";
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
					setDataPickerOpen(true);
				}}
			/>

			<Modal opened={isDataPickerOpen} onClose={() => setDataPickerOpen(false)} title="Select a role" size="90%">
				<RolePickerModal drs={drs as IDataRolesStore} handleAddNewRole={handleAddNewRole} />
			</Modal>
			<ProjectCard>
				<Stack gap="sm">
					{apr.project?.roles?.map((role, i) => {
						const rt = drs.roles.find((r) => r.guid === role.templateId);
						return (
							<Flex key={i} align="center">
								<Title order={4} style={{ flex: "0 0 auto", width: "25%" }}>
									{role.seniority && role.seniority !== ROLESENIORITY.MIDLEVEL ? role.seniority + " " : ""}
									{role.name}
								</Title>

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

								{/* <Text size="xs" style={{ flex: "3 3 auto" }}>
                                    {role.description}
                                </Text> */}

								<Box style={{ flex: "1 1 auto", textAlign: "right" }}>
									<Button variant="filled" size="sm" color="red" onClick={() => handleRemoveRole(role.guid)}>
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
						<Tooltip label={rolet.description} withArrow position="top" arrowSize={7} multiline openDelay={300} w={300}>
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
