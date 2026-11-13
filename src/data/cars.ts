import type { Car } from "./types";

export const cars: Car[] = [
  {
    id: "1",
    name: "مرسيدس-بنز S500 4MATIC",
    brand: "مرسيدس",
    year: 2024,
    vin: "W1K223XXXXXX5821",
    body: "سيدان",
    fuel: "بنزين",
    mileage: 4120,
    price: 595000,
    cost: 540000,
    status: "available",
    daysInStock: 24,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
    ],
    color: "أسود أوبسيديان",
    power: "429 حصان",
    engine: "3.0L 6 سلندر Twin-Turbo",
    transmission: "أوتوماتيك 9 سرعات",
    location: "الرياض - منصة A-04",
  },
  {
    id: "2",
    name: "بورش تايكان تيربو S",
    brand: "بورش",
    year: 2024,
    vin: "WP0ZZZXXXXXX9012",
    body: "كوبيه",
    fuel: "كهرباء",
    mileage: 2100,
    price: 745000,
    cost: 680000,
    status: "available",
    daysInStock: 18,
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    ],
    color: "أبيض ثلجي",
    power: "761 حصان",
    engine: "محركين كهربائيين",
    transmission: "أوتوماتيك نشط",
    location: "الرياض - منصة B-02",
  },
  {
    id: "3",
    name: "لكزس LX 600 VIP",
    brand: "لكزس",
    year: 2023,
    vin: "JTJHY7XXXXXX4410",
    body: "SUV",
    fuel: "بنزين",
    mileage: 12500,
    price: 520000,
    cost: 475000,
    status: "reserved",
    daysInStock: 41,
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
    ],
    color: "رمادي لؤلؤي",
    power: "409 حصان",
    engine: "3.5L V6 Twin-Turbo",
    transmission: "أوتوماتيك 10 سرعات",
    location: "جدة - منصة C-01",
  },
  {
    id: "4",
    name: "بي إم دبليو 735i",
    brand: "بي إم دبليو",
    year: 2024,
    vin: "WBA7E2XXXXXX3301",
    body: "سيدان",
    fuel: "بنزين",
    mileage: 6800,
    price: 410000,
    cost: 372000,
    status: "prep",
    daysInStock: 9,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617531653520-bd460e5ae077?auto=format&fit=crop&w=1200&q=80",
    ],
    color: "أزرق بحري",
    power: "380 حصان",
    engine: "3.0L 6 سلندر",
    transmission: "أوتوماتيك 8 سرعات",
    location: "الرياض - ورشة التجهيز",
  },
  {
    id: "5",
    name: "تويوتا لاندكروزر LC300",
    brand: "تويوتا",
    year: 2024,
    vin: "JTMHV0XXXXXX7788",
    body: "SUV",
    fuel: "بنزين",
    mileage: 3200,
    price: 365000,
    cost: 330000,
    status: "available",
    daysInStock: 12,
    images: [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    ],
    color: "أبيض لؤلؤي",
    power: "409 حصان",
    engine: "3.5L V6 Twin-Turbo",
    transmission: "أوتوماتيك 10 سرعات",
    location: "الخبر - منصة D-03",
  },
  {
    id: "6",
    name: "أودي RS6 أفانت",
    brand: "أودي",
    year: 2023,
    vin: "WUAPAFXXXXXX2209",
    body: "واجن",
    fuel: "بنزين",
    mileage: 8900,
    price: 455000,
    cost: 415000,
    status: "sold",
    daysInStock: 67,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
    ],
    color: "رمادي ناردو",
    power: "600 حصان",
    engine: "4.0L V8 BiTurbo",
    transmission: "أوتوماتيك 8 سرعات",
    location: "الرياض - مباعة",
  },
];

export function getCar(id: string) {
  return cars.find((car) => car.id === id);
}

export function carImage(car: Car, index = 0) {
  return car.images[index] ?? car.images[0];
}

export function formatMoney(value: number) {
  return `${value.toLocaleString("en-US")} ر.س`;
}

export function marginPercent(price: number, cost: number) {
  return Math.round(((price - cost) / cost) * 1000) / 10;
}
