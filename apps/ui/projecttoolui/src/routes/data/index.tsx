import { createFileRoute } from '@tanstack/react-router'
import DataShell from '../../components/DataShell/DataShell'

export const Route = createFileRoute('/data/')({
  component: DataIndexComponent,
})

function DataIndexComponent() {
  
    return (
        <DataShell>
            <div>Data Home Page</div>
        </DataShell>
    )
}
