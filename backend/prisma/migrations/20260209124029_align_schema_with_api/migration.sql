/*
  Warnings:

  - The values [PENDING] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isActive` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PLACED', 'ACCEPTED', 'REJECTED');
ALTER TABLE "public"."Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PLACED';
COMMIT;

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "isActive",
ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerName" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PLACED';
