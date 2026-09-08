/*
  Warnings:

  - You are about to alter the column `date_added` on the `my_lists` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `order_date` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `my_lists` MODIFY `date_added` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `order_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `username` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);
