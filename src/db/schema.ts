import { createId } from '@paralleldrive/cuid2'
import { timestamp } from 'drizzle-orm/pg-core'
import { integer } from 'drizzle-orm/pg-core'
import { pgTable, text } from 'drizzle-orm/pg-core'

export const goals = pgTable('goals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const goalCompletions = pgTable('goal_completion', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  goaldId: text('goal_id')
    .references(() => goals.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
