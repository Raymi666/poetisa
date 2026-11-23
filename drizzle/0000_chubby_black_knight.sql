CREATE TABLE `wave_poems` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`date` text NOT NULL,
	`name` text NOT NULL,
	`words` text NOT NULL,
	`text` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `wave_poems_session_date` ON `wave_poems` (`session_id`,`date`);--> statement-breakpoint
CREATE TABLE `wave_quotas` (
	`id` text PRIMARY KEY NOT NULL,
	`used` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wave_reminders` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`confirmed` integer DEFAULT 0 NOT NULL,
	`confirm_token` text NOT NULL,
	`unsubscribe_token` text NOT NULL,
	`created_at` integer NOT NULL,
	`consent` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `wave_reminders_email_unique` ON `wave_reminders` (`email`);--> statement-breakpoint
CREATE TABLE `wave_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`expires` integer NOT NULL,
	`busy_until` integer DEFAULT 0 NOT NULL
);
