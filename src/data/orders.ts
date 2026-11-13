import type { Order } from "./types";

export const orders: Order[] = [
  {
    id: "ORD-1042",
    date: "2024-10-28",
    customer: "عبدالرحمن بن سعود",
    phone: "0501234567",
    carId: "1",
    payment: "electronic",
    amount: 595000,
    status: "partial",
  },
  {
    id: "ORD-1041",
    date: "2024-10-27",
    customer: "نورة العتيبي",
    phone: "0559876543",
    carId: "3",
    payment: "cash",
    amount: 520000,
    status: "partial",
  },
  {
    id: "ORD-1040",
    date: "2024-10-26",
    customer: "خالد الشمري",
    phone: "0533344556",
    carId: "5",
    payment: "cash",
    amount: 365000,
    status: "partial",
  },
  {
    id: "ORD-1039",
    date: "2024-10-24",
    customer: "سارة القحطاني",
    phone: "0541122334",
    carId: "2",
    payment: "electronic",
    amount: 745000,
    status: "completed",
  },
  {
    id: "ORD-1038",
    date: "2024-10-22",
    customer: "فهد الدوسري",
    phone: "0567788990",
    carId: "6",
    payment: "electronic",
    amount: 455000,
    status: "completed",
  },
];

export function getOrder(id: string) {
  return orders.find((order) => order.id === id);
}
