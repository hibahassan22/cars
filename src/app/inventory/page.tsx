import { DmsShell } from "@/components/dms/DmsShell";
import { InventoryTable } from "@/components/dms/InventoryTable";
import { cars } from "@/data/cars";

export default function InventoryPage() {
  return (
    <DmsShell
      title="مخزون السيارات"
      subtitle="متابعة السيارات المعروضة وحالاتها وهوامش البيع"
    >
      <InventoryTable cars={cars} />
    </DmsShell>
  );
}
