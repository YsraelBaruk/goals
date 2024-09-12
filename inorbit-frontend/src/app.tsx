import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { WeeklySummary } from './components/summary'
import { EmptyGoal } from './components/empty-goal'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'
import { Loader2 } from 'lucide-react'

export function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, //60 segundos
  })

  if (isLoading || !data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="text-zinc-500 animate-spin size-10" />
      </div>
    )
  }

  console.log(data.summary.total)

  return (
    <Dialog>
      {data.summary.total > 0 ? (
        <WeeklySummary summary={data.summary} />
      ) : (
        <EmptyGoal />
      )}
      <CreateGoal />
    </Dialog>
  )
}
