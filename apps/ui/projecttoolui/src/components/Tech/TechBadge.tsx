import { ETECHAPPLICATIONLAYER, ETECHCATEGORY } from "@frosttroll/projecttoolmodels";
import { Badge, BadgeProps } from "@mantine/core";

import "./tech-badge.css";

interface TechBadgeProps extends BadgeProps {
    layer?: ETECHAPPLICATIONLAYER;
    category?: ETECHCATEGORY;
}

const TechBadge = (props: TechBadgeProps) => {
    const { layer, category, ...badgeProps } = props;

    const layerClassName = (layer || "")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const categoryClassName = (category || "")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return (
        <Badge className={`tech-badge ${layerClassName} ${categoryClassName}`} {...badgeProps}>
            {layer || category || "Unknown"}
        </Badge>
    );
};

export default TechBadge;
