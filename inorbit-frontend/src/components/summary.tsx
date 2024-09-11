import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-BR"

dayjs.locale(ptBR)

export function Summary(){
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, //60 segundos
  })

  if(!data){
    return
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMMM')
  
  const completedPercentage = Math.round(data?.completed * 100) / data?.total

  return(
    <div className="flex py-10 max-w-[480px] px-5 mx-auto flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="felx items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">{firstDayOfWeek} - {lastDayOfWeek}</span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
      
      <div className="flex flex-col gap-3"> 
        <Progress value={8} max={15} >
          <ProgressIndicator style={{width: `${completedPercentage}%`}} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Você completou {' '}
            <span className="text-zinc-100">{data?.completed}</span> de{' '}
            <span className="text-zinc-100">{data?.total}</span>{' '}
            metas nessa semana.</span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          <Plus className="size-4 text-zinc-600"/>
          Meditar
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600"/>
          Orar
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600"/>
          Ler
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600"/>
          Acordar cedo
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600"/>
          Basquete
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl">Sua semana</h2>
        
        {Object.entries(data.goalsPerDay).map(([data, goals]) => {
            const weekDay = dayjs(data).format('dddd')
            const formattedDate = dayjs(data).format('DD [d]e MMMM')
            return(
              <div key={data} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay}</span>{' '}
                  <span className="text-zinc-400 text-xs">({formattedDate})</span>
                </h3>
                <ul className="flex-col flex gap-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-pink-500"/>
                    <span className="text-sm text-zinc-400">
                      Você completou "
                      <span className="text-zinc-100">Acordar cedo</span>" às{' '} 
                      <span className="text-zinc-100">08:13h</span>
                    </span>
                    <p className="underline text-xs text-zinc-500">Desfazer</p>
                  </li>
                </ul>
              </div>
            )
          }

        )}

      </div>
    </div>
  )
}