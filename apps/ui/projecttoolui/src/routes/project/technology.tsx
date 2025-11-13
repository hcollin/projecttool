import { createFileRoute } from '@tanstack/react-router'
import ProjectShell from '../../components/ProjectShell/ProjectShell'
import { Container, Title } from '@mantine/core'

export const Route = createFileRoute('/project/technology')({
  component: ProjectTechnologyComponent,
})

function ProjectTechnologyComponent() {
  

  return (
    <ProjectShell>
      <Container size="xl">
        <Title order={1}>Project Technology</Title>
      </Container>
    </ProjectShell>
  )
}
