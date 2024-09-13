import dayjs from 'dayjs'
import { CheckCircle2, Sidebar } from 'lucide-react'
import type { GetSummaryResponse } from '../http/get-summary'
import ptBR from 'dayjs/locale/pt-BR'

dayjs.locale(ptBR)

interface DashBoardTaskProps {
  summary: GetSummaryResponse['summary']
}

export function DashBoardTask({ summary }: DashBoardTaskProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl">Sua semana</h2>

      {summary.goalsPerDay == null
        ? 'Conclua as atividades acima'
        : Object.entries(summary.goalsPerDay).map(([data, goals]) => {
            const weekDay = dayjs(data).format('dddd')
            const formattedDate = dayjs(data).format('D [d]e MMMM')
            return (
              <div key={data} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay}</span>{' '}
                  <span className="text-zinc-400 text-xs">
                    ({formattedDate})
                  </span>
                </h3>
                <ul className="flex-col flex gap-3">
                  {goals.map(goal => {
                    const time = dayjs(goal.createdAt).format('HH:mm[h]')

                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          Você completou "
                          <span className="text-zinc-100">{goal.title}</span>"
                          às <span className="text-zinc-100">{time}</span>
                        </span>
                        <p className="underline text-xs cursor-pointer text-zinc-500">
                          Desfazer
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
    </div>
  )
}
