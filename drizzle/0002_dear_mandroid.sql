CREATE TABLE `poetisa_deliveries` (
	`id` text PRIMARY KEY NOT NULL,
	`reminder_id` text NOT NULL,
	`slot` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`finished_at` integer
);
--> statement-breakpoint
CREATE TABLE `poetisa_quotas` (
	`id` text PRIMARY KEY NOT NULL,
	`used` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `poetisa_readings` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`date` text NOT NULL,
	`name` text NOT NULL,
	`words` text NOT NULL,
	`poem_id` text NOT NULL,
	`poem_json` text NOT NULL,
	`reason` text NOT NULL,
	`relevance` text NOT NULL,
	`selection_method` text NOT NULL,
	`catalog_version` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `poetisa_session_day` ON `poetisa_readings` (`session_id`,`date`);--> statement-breakpoint
CREATE TABLE `poetisa_reminders` (
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
CREATE UNIQUE INDEX `poetisa_reminders_email_unique` ON `poetisa_reminders` (`email`);--> statement-breakpoint
CREATE TABLE `poetisa_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`expires` integer NOT NULL,
	`busy_until` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DROP TABLE `wave_deliveries`;--> statement-breakpoint
DROP TABLE `wave_poems`;--> statement-breakpoint
DROP TABLE `wave_quotas`;--> statement-breakpoint
DROP TABLE `wave_reminders`;--> statement-breakpoint
DROP TABLE `wave_sessions`;