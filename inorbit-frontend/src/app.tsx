import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
// import { EmptyGoal } from './components/empty-goal'

export function App() {
  return (
    <Dialog>
      {/* <EmptyGoal /> */}
      <Summary />
      <CreateGoal />
    </Dialog>
  )
}
