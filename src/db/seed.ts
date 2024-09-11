import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cendo', desiredWeeklyFrequency: 5 },
      { title: 'Exercitar', desiredWeeklyFrequency: 3 },
      { title: 'Meditar', desiredWeeklyFrequency: 7 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goaldId: result[0].id, createdAt: startOfWeek.toDate() },
    { goaldId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    { goaldId: result[2].id, createdAt: startOfWeek.add(2, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
