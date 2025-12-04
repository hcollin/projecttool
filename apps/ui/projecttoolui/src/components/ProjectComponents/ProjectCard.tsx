import { Card, CardProps } from "@mantine/core";

interface ProjectCardProps extends CardProps {
    children?: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

const ProjectCard = (props: ProjectCardProps) => {
    const { children, className, noPadding, ...rest } = props;
    return (
        <Card
            shadow="sm"
            padding={noPadding ? "0" : "lg"}
            radius="md"
            withBorder
            className={`project-card ${className}`}
            {...rest}
            mb="xl"
        >
            {children}
        </Card>
    );
};
export default ProjectCard;
