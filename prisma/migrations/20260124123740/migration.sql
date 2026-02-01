-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "selectedId" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
