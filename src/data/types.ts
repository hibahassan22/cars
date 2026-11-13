export type CarStatus = "available" | "reserved" | "prep" | "sold";
export type OrderStatus = "partial" | "completed";
export type PaymentMethod = "cash" | "electronic";

export type Car = {
  id: string;
  name: string;
  brand: string;
  year: number;
  vin: string;
  body: string;
  fuel: string;
  mileage: number;
  price: number;
  cost: number;
  status: CarStatus;
  daysInStock: number;
  /** ثلاث صور: واجهة، جانب، مقصورة */
  images: [string, string, string];
  color: string;
  power: string;
  engine: string;
  transmission: string;
  location: string;
};

export type Order = {
  id: string;
  date: string;
  customer: string;
  phone: string;
  carId: string;
  payment: PaymentMethod;
  amount: number;
  status: OrderStatus;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  orders: number;
  spend: number;
};
