import { IDocFileContent } from "@frosttroll/projecttoolmodels";
import { Button } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

const DocRenderUnknown = (props: { doc: IDocFileContent; onClick: () => void }) => {
    return (
        <Button
            className="unknown-doc-content"
            onClick={props.onClick}
            variant="light"
            fullWidth
            p="xs"
            size="xl"
            leftSection={<IconQuestionMark size={32} />}
        >
            Click to edit unknown content type
        </Button>
    );
};
export default DocRenderUnknown;
