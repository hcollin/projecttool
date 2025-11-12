import { createFileRoute } from '@tanstack/react-router'
import ProjectShell from '../../components/ProjectShell/ProjectShell'
import { Container, Title } from '@mantine/core'

export const Route = createFileRoute('/project/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return  (
    <ProjectShell>
        <Container size="xl">
            <Title order={1}>Project Settings</Title>
        </Container>

    </ProjectShell>
  )}
