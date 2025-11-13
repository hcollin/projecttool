import { Title, TitleProps } from "@mantine/core";

interface ProjectPageMainTitleProps extends TitleProps {
    children: React.ReactNode;
}

const ProjectPageMainTitle = (props: ProjectPageMainTitleProps) => {
    const { children, className, ...rest } = props;
    return <Title order={1} mb="md" className={`project-page-main-title ${className}`} {...rest}>{children}</Title>;
}
export default ProjectPageMainTitle;