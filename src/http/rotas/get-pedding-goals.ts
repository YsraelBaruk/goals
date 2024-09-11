import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'

export const getPeddingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pedding-goals', async () => {
    const { penddingsGoals } = await getWeekPendingGoals()
    return { penddingsGoals }
  })
}
