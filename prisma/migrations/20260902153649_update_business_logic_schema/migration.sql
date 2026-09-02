/*
  Warnings:

  - You are about to alter the column `date_added` on the `my_lists` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `order_date` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `episodes` DROP FOREIGN KEY `episodes_film_id_fkey`;

-- DropForeignKey
ALTER TABLE `my_lists` DROP FOREIGN KEY `my_lists_film_id_fkey`;

-- DropIndex
DROP INDEX `my_lists_film_id_fkey` ON `my_lists`;

-- AlterTable
ALTER TABLE `films` ADD COLUMN `url_video` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `my_lists` MODIFY `date_added` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `order_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `packages` ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` VARCHAR(20) NOT NULL DEFAULT 'user';

-- AddForeignKey
ALTER TABLE `episodes` ADD CONSTRAINT `episodes_film_id_fkey` FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `my_lists` ADD CONSTRAINT `my_lists_film_id_fkey` FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
