import { Card, CardProps } from "@mantine/core";

interface ProjectCardProps extends CardProps {
    children?: React.ReactNode;
    className?: string;
}

const ProjectCard = (props: ProjectCardProps) => {
    const { children, className, ...rest } = props;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className={`project-card ${className}`} {...rest} mb="xl">
            {children}
        </Card>
    );
};
export default ProjectCard;
