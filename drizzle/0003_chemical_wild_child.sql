CREATE TABLE `poetisa_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`provider_uid` text NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL,
	`invitation_on` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `poetisa_accounts_provider_uid_unique` ON `poetisa_accounts` (`provider_uid`);--> statement-breakpoint
CREATE TABLE `poetisa_push_deliveries` (
	`id` text PRIMARY KEY NOT NULL,
	`push_id` text NOT NULL,
	`day` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`finished_at` integer
);
--> statement-breakpoint
CREATE TABLE `poetisa_pushes` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`subscription` text NOT NULL,
	`created_at` integer NOT NULL,
	`consent` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `poetisa_push_account` ON `poetisa_pushes` (`account_id`);--> statement-breakpoint
CREATE TABLE `poetisa_writings` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`status` text NOT NULL,
	`revision` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`day` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `poetisa_writings_account` ON `poetisa_writings` (`account_id`,`updated_at`);