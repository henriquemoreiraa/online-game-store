/*
  Warnings:

  - You are about to drop the column `cartId` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `wish_listId` on the `Games` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_genresId_fkey";

-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_wish_listId_fkey";

-- AlterTable
ALTER TABLE "Games" DROP COLUMN "cartId",
DROP COLUMN "wish_listId";

-- CreateTable
CREATE TABLE "_GamesToGenres" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_cart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_user_games" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToGenres_AB_unique" ON "_GamesToGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToGenres_B_index" ON "_GamesToGenres"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_cart_AB_unique" ON "_cart"("A", "B");

-- CreateIndex
CREATE INDEX "_cart_B_index" ON "_cart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_user_games_AB_unique" ON "_user_games"("A", "B");

-- CreateIndex
CREATE INDEX "_user_games_B_index" ON "_user_games"("B");

-- AddForeignKey
ALTER TABLE "_GamesToGenres" ADD CONSTRAINT "_GamesToGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGenres" ADD CONSTRAINT "_GamesToGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cart" ADD CONSTRAINT "_cart_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cart" ADD CONSTRAINT "_cart_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_games" ADD CONSTRAINT "_user_games_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_games" ADD CONSTRAINT "_user_games_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
