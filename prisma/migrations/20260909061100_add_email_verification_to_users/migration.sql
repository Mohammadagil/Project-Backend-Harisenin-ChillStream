/*
  Warnings:

  - You are about to alter the column `date_added` on the `my_lists` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `order_date` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `my_lists` MODIFY `date_added` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `order_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `verification_token` VARCHAR(255) NULL;
