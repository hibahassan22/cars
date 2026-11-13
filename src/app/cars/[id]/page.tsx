import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoreHeader } from "@/components/store/StoreHeader";
import { carImage, cars, formatMoney, getCar } from "@/data/cars";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { carStatusLabel, carStatusTone } from "@/lib/labels";

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  return (
    <div className="min-h-screen">
      <StoreHeader />
      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
          <Image src={carImage(car)} alt={car.name} fill className="object-cover" priority sizes="50vw" />
        </div>
        <div>
          <StatusBadge label={carStatusLabel[car.status]} tone={carStatusTone[car.status]} />
          <h1 className="mt-4 font-[family-name:var(--font-cairo)] text-3xl font-extrabold sm:text-4xl">
            {car.name}
          </h1>
          <p className="mt-2 text-muted">
            {car.year} · {car.body} · {car.fuel}
          </p>
          <p className="mt-6 text-3xl font-bold text-accent">{formatMoney(car.price)}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border bg-surface p-3">
              <dt className="text-muted">القوة</dt>
              <dd className="mt-1 font-medium">{car.power}</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <dt className="text-muted">الممشى</dt>
              <dd className="mt-1 font-medium">{car.mileage.toLocaleString("en-US")} كم</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <dt className="text-muted">اللون</dt>
              <dd className="mt-1 font-medium">{car.color}</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <dt className="text-muted">الموقع</dt>
              <dd className="mt-1 font-medium">{car.location}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-ink/90"
            >
              احجز معاينة
            </Link>
            <Link
              href={`/inventory/${car.id}`}
              className="rounded-lg border border-border px-5 py-3 text-sm font-medium hover:bg-surface"
            >
              عرض في DMS
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
