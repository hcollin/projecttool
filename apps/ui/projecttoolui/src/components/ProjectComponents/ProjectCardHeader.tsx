import { Button, Divider, Flex, Title } from "@mantine/core";
import { EIconSet } from "../Icons/IconSet";
import AddIcon from "../Icons/AddIcon";

interface ProjectCardHeaderProps {
    label: string;

    addNewAction?: () => void;

    children?: React.ReactNode;

    /**
     * What icon set is used for this header's actions (if any).
     */
    dataType?: EIconSet;
}

const ProjectCardHeader = (props: ProjectCardHeaderProps) => {
    const showActions = props.addNewAction !== undefined || props.children !== undefined;

    return (
        <Flex mb="xs">
            <Title order={2}>{props.label}</Title>
            {showActions && (
                <Flex ml="auto" align="center" gap="xs">
                    
                    {props.children}
                    <Divider orientation="vertical" mx="sm" />
                    {props.addNewAction && (
                        <Button onClick={props.addNewAction} variant="contained">
                            <AddIcon dataType={props.dataType} style={{ marginRight: "8px" }} />
                            NEW
                        </Button>
                    )}
                </Flex>
            )}
        </Flex>
    );
};

export default ProjectCardHeader;
