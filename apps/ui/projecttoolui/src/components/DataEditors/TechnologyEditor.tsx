import { ETECHAPPLICATIONLAYER, ETECHCATEGORY, ITechnology } from "@frosttroll/projecttoolmodels";
import { Button, Card, Flex, Input, MultiSelect, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import TechApplicationLayerIcon from "../Icons/TechApplicationLayerIcon";

interface ITechnologyEditorProps {
    tech: Partial<ITechnology>;
    onConfirm: (tech: ITechnology) => void;
    onCancel?: () => void;
}

const TechnologyEditor = (props: ITechnologyEditorProps) => {
    const { tech } = props;

    const [name, setName] = useState(tech.name || "");
    const [description, setDescription] = useState(tech.description || "");

    const [categories, setCategories] = useState<ETECHCATEGORY[]>(tech.category || []);
    const [appLayers, setAppLayers] = useState<ETECHAPPLICATIONLAYER[]>(tech.appLayer || []);

    function handleConfirm() {
        const ntech: ITechnology = {
            ...tech,
            guid: tech.guid || "",
            name: name,
            description: description,
            category: categories,
            appLayer: appLayers,
        };
        props.onConfirm(ntech);
    }

    const categoryOptions = Object.values(ETECHCATEGORY);

    const appLayerOptions = Object.values(ETECHAPPLICATIONLAYER);

    const isValid = name.trim().length > 0 && categories.length > 0 && appLayers.length > 0;

    return (
        <>
            <Card>
                <Stack gap="md">
                    <TextInput
                        label="Name"
                        description="The name of the technology eg. React, Java, Hibernate etc."
                        value={name}
                        onChange={(event) => setName(event.currentTarget.value)}
                    />

                    <TextInput
                        label="Description"
                        description="A brief description of the technology that is used in this tool."
                        value={description}
                        onChange={(event) => setDescription(event.currentTarget.value)}
                    />

                    <MultiSelect
                        label="Category"
                        description="Select one or more categories that best describe this technology."
                        data={categoryOptions.map((category) => ({ value: category, label: category }))}
                        value={categories}
                        onChange={(val) => setCategories(val as ETECHCATEGORY[])}
                        hidePickedOptions
                    />

                    <Input.Wrapper
                        label="Application Layer"
                        description="Select up to two application layers for this technology."
                    >
                        <Flex mt="xs">
                            {appLayerOptions.map((layer) => {
                                const isDisabled =
                                    !appLayers.includes(layer as ETECHAPPLICATIONLAYER) && appLayers.length >= 2;
                                return (
                                    <Button
                                        variant="filled"
                                        key={layer}
                                        size="md"
                                        color={appLayers.includes(layer as ETECHAPPLICATIONLAYER) ? "blue.7" : "gray.7"}
                                        style={{ marginRight: "8px" }}
                                        disabled={isDisabled}
                                        onClick={() => {
                                            if (appLayers.includes(layer as ETECHAPPLICATIONLAYER)) {
                                                // Remove from selection
                                                setAppLayers(appLayers.filter((al) => al !== layer));
                                            } else {
                                                // Add to selection if there are less than 2 selected
                                                if (appLayers.length < 2) {
                                                    setAppLayers([...appLayers, layer as ETECHAPPLICATIONLAYER]);
                                                }
                                            }
                                        }}
                                        leftSection={
                                            <TechApplicationLayerIcon appLayer={layer as ETECHAPPLICATIONLAYER} />
                                        }
                                    >
                                        {layer}
                                    </Button>
                                );
                            })}
                        </Flex>
                    </Input.Wrapper>
                </Stack>

                {/* <TextInputEdit label="Description" value={tech.description || ""} onChange={(val) => (tech.description = val)} /> */}
            </Card>
            <Card>
                <Flex justify="flex-end" gap="md">
                    {props.onCancel && (
                        <Button variant="outlined" color="gray" onClick={props.onCancel}>
                            Cancel
                        </Button>
                    )}
                    <Button variant="contained" onClick={handleConfirm} disabled={!isValid}>
                        Confirm
                    </Button>
                </Flex>
            </Card>
        </>
    );
};

export default TechnologyEditor;
