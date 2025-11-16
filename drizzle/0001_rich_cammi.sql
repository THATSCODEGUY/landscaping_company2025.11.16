CREATE TABLE `images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` enum('interlocking','powerwashing','relevelling','polymer_sand','paver_sealing','yard_works','about','hero','other') NOT NULL,
	`url` varchar(1024) NOT NULL,
	`source` enum('local','google_drive','external') NOT NULL DEFAULT 'local',
	`googleDriveFileId` varchar(255),
	`displayOrder` int NOT NULL DEFAULT 0,
	`isActive` int NOT NULL DEFAULT 1,
	`width` int,
	`height` int,
	`fileSize` int,
	`mimeType` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(100) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`titleZh` varchar(255) NOT NULL,
	`descriptionEn` text,
	`descriptionZh` text,
	`featuredImageId` int,
	`displayOrder` int NOT NULL DEFAULT 0,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`),
	CONSTRAINT `services_key_unique` UNIQUE(`key`)
);
