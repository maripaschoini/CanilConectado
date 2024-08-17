/*
  Warnings:

  - You are about to drop the column `ong` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `animal` ADD COLUMN `image` LONGBLOB NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `ong`;
