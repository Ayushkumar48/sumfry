import { sql } from 'drizzle-orm';
import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import type { MetaData } from 'metadata-scraper';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const bookmarks = pgTable('bookmarks', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	url: text('url').notNull(),
	metaData: jsonb('meta_data').notNull().$type<MetaData>(),
	summary: text('summary').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Bookmark = typeof bookmarks.$inferSelect;
export type NewBookmark = typeof bookmarks.$inferInsert;
