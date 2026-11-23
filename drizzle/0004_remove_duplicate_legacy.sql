-- A failed deployment replayed duplicate build copies of migrations 0000/0001.
-- Their five legacy tables were confirmed empty on 2026-11-07.
-- Preserve all PoetisA tables and immutable migration history.
DROP TABLE IF EXISTS `wave_deliveries`;
--> statement-breakpoint
DROP TABLE IF EXISTS `wave_poems`;
--> statement-breakpoint
DROP TABLE IF EXISTS `wave_quotas`;
--> statement-breakpoint
DROP TABLE IF EXISTS `wave_reminders`;
--> statement-breakpoint
DROP TABLE IF EXISTS `wave_sessions`;
