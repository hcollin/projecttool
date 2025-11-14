import { IconProps, IconUserPlus, IconUsersPlus, IconFilePlus, IconHexagonPlus, IconPlus } from "@tabler/icons-react";
import { EIconSet } from "./IconSet";


interface AddIconProps extends IconProps {
    dataType?: EIconSet;
}

function AddIcon({ dataType, ...props }: AddIconProps) {
    switch (dataType) {
        case "user":
            return <IconUserPlus {...props} />;
        case "team":
            return <IconUsersPlus {...props} />;
        case "file":
            return <IconFilePlus {...props} />;
        case "tech":
            return <IconHexagonPlus {...props} />;
        default:
            return <IconPlus {...props} />;
    }
}

export default AddIcon;