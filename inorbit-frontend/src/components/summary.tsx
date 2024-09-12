import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import { PendingGoals } from './pedding-goals'
import type { GetSummaryResponse } from '../http/get-summary'
import { DashBoardTask } from './dash-board-task'

dayjs.locale(ptBR)

interface WeeklySummaryProps {
  summary: GetSummaryResponse['summary']
}

export function WeeklySummary({ summary }: WeeklySummaryProps) {
  const firstDayOfWeek = dayjs().startOf('week').format('D[ de ]MMMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D[ de ]MMMM')

  const completedPercentage = Math.round(
    (summary?.completed * 100) / summary?.total
  ).toFixed(0)
  return (
    <div className="flex py-10 max-w-[480px] px-5 mx-auto flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="felx items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{summary?.completed}</span> de{' '}
            <span className="text-zinc-100">{summary?.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      {summary.completed === 0 ? (
        <DashBoardTask />
      ) : (
        <p>Concluia alguma tarefa</p>
      )}
    </div>
  )
}
