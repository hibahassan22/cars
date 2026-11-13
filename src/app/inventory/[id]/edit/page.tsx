import Link from "next/link";
import { notFound } from "next/navigation";
import { CarEditForm } from "@/components/dms/CarEditForm";
import { DmsShell } from "@/components/dms/DmsShell";
import { cars, getCar } from "@/data/cars";

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  return (
    <DmsShell title="تعديل السيارة" subtitle={car.name}>
      <div className="mb-5">
        <Link
          href={`/inventory/${car.id}`}
          className="rounded-xl border border-border-soft px-4 py-2 text-sm hover:bg-surface"
        >
          رجوع للتفاصيل
        </Link>
      </div>
      <CarEditForm car={car} />
    </DmsShell>
  );
}
