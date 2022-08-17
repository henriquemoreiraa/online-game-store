/*
  Warnings:

  - You are about to drop the column `game_banner` on the `Games` table. All the data in the column will be lost.
  - Added the required column `game_trailer` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "game_banner",
ADD COLUMN     "game_trailer" TEXT NOT NULL DEFAULT 'Sandnes';
