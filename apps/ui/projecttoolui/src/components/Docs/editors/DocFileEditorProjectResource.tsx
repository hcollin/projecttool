import {
    EDOCITEMTYPE,
    IDocFileProjectResource,
    IProject,
    IRole,
    IText,
    ROLESENIORITY,
} from "@frosttroll/projecttoolmodels";
import { IDocFileEditorProps } from "../DocFileEditor";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Modal, Select, Stack, Switch, Text } from "@mantine/core";
import { useSnapshot } from "valtio";
import activeProjectStore from "../../../stores/activeproject/activeProjectStore";

import TextPicker from "../../TextPicker/TextPicker";
import { apiGetText } from "../../../api/texts/apiTexts";
import { useRoleTemplates } from "../../../stores/data/roles/dataRoleTemplateHooks";

const DocFileEditorProjectResource = (props: IDocFileEditorProps) => {
    const aps = useSnapshot(activeProjectStore);
    const project = aps.project as IProject;
    const item = props.contentItem as IDocFileProjectResource;
    const roleTemplates = useRoleTemplates();

    const [role, setRole] = useState<IRole | null>(() => {
        const foundRole = project.roles.find((r) => r.guid === item.resourceId);
        return foundRole ? foundRole : null;
    });
    const [text, setText] = useState<IText | null>(null);

    const [opened, setOpened] = useState(false);

    const [headerLevel, setHeaderLevel] = useState<number>(item.headerLevel !== undefined ? item.headerLevel : -1);
    const [showPrice, setShowPrice] = useState<boolean>(item.showPrice !== undefined ? item.showPrice : false);
    const [phaseUsage, setPhaseUsage] = useState<boolean>(
        item.showPhaseUsage !== undefined ? item.showPhaseUsage : false
    );
    const [textGuid, setTextGuid] = useState<string>(
        item.textGuid !== undefined
            ? item.textGuid
            : () => {
                  if (role) {
                      const tpl = role.template || roleTemplates.find((rt) => rt.guid === role.templateId);
                      if (tpl) {
                          return tpl.defaultTextGuid || "";
                      }
                  }
                  return "";
              }
    );

    const [updContent, setUpdContent] = useState<IDocFileProjectResource>(item);

    useEffect(() => {
        if (textGuid !== "") {
            apiGetText(textGuid).then((fetchedText) => {
                if (fetchedText) {
                    setText(fetchedText);
                } else {
                    console.warn("Text not found for guid", textGuid);
                    setText(null);
                }
            });
        }
    }, [textGuid]);

    useEffect(() => {
        const newContent: IDocFileProjectResource = {
            ...props.contentItem,
            type: EDOCITEMTYPE.PRJRESOURCE,
            resourceId: role ? role.guid : "",
            headerLevel: headerLevel,
            textGuid: textGuid,
            showPrice: showPrice,
            showPhaseUsage: phaseUsage,
        };
        setUpdContent(newContent);
        props.onSave(newContent);
    }, [headerLevel, showPrice, phaseUsage, textGuid, role]);

    function handleChangeRole(newRole: IRole | null) {
        setRole(newRole);
        setOpened(false);
    }

    return (
        <>
            <Box>
                <Flex align="center" gap="sm" mb="md">
                    <Text fw="bold" my="xs">
                        {role ? role.name : "No role selected"}
                    </Text>
                    <Button variant="filled" onClick={() => setOpened(true)}>
                        Select new Resource
                    </Button>
                </Flex>

                <Flex gap="lg" mb="md" align="center" justify="flex-start">
                    <Select
                        label="Show name as header level"
                        data={[
                            { value: "-1", label: "Not a header, just bold text" },
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            { value: "6", label: "6" },
                        ]}
                        value={headerLevel.toString()}
                        onChange={(val) => {
                            const level = val ? parseInt(val) : -1;
                            setHeaderLevel(level);
                        }}
                    />
                    <Flex gap="sm" align="center">
                        <Box>
                            <Text mb="xs" size="sm">
                                Description Text
                            </Text>
                            <Text>{text ? text.name : "No text selected"}</Text>
                        </Box>
                        <TextPicker
                            onSelect={(guid: string) => {
                                setTextGuid(guid);
                            }}
                        >
                            Select Text for Description
                        </TextPicker>
                    </Flex>

                    <Stack>
                        <Switch
                            label="Show Price"
                            checked={showPrice}
                            onChange={(event) => {
                                setShowPrice(event.currentTarget.checked);
                            }}
                        />
                        <Switch
                            label="Show Phase Usage"
                            checked={phaseUsage}
                            onChange={(event) => {
                                setPhaseUsage(event.currentTarget.checked);
                            }}
                        />
                    </Stack>
                </Flex>
            </Box>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Select Project Resource" size="xl">
                <Flex direction="row" gap="sm" wrap="wrap">
                    {project.roles.map((r) => {
                        return (
                            <Button
                                key={r.guid}
                                variant="filled"
                                onClick={() => {
                                    handleChangeRole(r);
                                }}
                            >
                                {r.seniority && r.seniority !== ROLESENIORITY.MIDLEVEL ? r.seniority + " " : ""}{" "}
                                {r.name}
                            </Button>
                        );
                    })}
                </Flex>
            </Modal>
        </>
    );
};

export default DocFileEditorProjectResource;
