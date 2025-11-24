import { ETECHAPPLICATIONLAYER } from "@frosttroll/projecttoolmodels";
import {
    IconCancel,
    IconDatabase,
    IconDeviceDesktop,
    IconNetwork,
    IconPackage,
    IconProps,
    IconQuestionMark,
    IconServer,
    IconShield,
} from "@tabler/icons-react";

interface ITechApplicationLayerIconProps extends IconProps {
    appLayer: ETECHAPPLICATIONLAYER;
}

const TechApplicationLayerIcon = (props: ITechApplicationLayerIconProps) => {
    const { appLayer, ...iconProps } = props;

    switch (appLayer) {
        case ETECHAPPLICATIONLAYER.FRONTEND:
            return <IconDeviceDesktop {...iconProps} />;
        case ETECHAPPLICATIONLAYER.BACKEND:
            return <IconPackage {...iconProps} />;
        case ETECHAPPLICATIONLAYER.DATABASE:
            return <IconDatabase {...iconProps} />;
        case ETECHAPPLICATIONLAYER.INFRA:
            return <IconServer {...iconProps} />;
        case ETECHAPPLICATIONLAYER.SECURITY:
            return <IconShield {...iconProps} />;
        case ETECHAPPLICATIONLAYER.NETWORK:
            return <IconNetwork {...iconProps} />;
        case ETECHAPPLICATIONLAYER.NONE:
            return <IconCancel {...iconProps} />;
        case ETECHAPPLICATIONLAYER.OTHER:
            return <IconQuestionMark {...iconProps} />;
        default:
            return null;
    }
};

export default TechApplicationLayerIcon;
