import type { Customer } from "./types";

export const customers: Customer[] = [
  {
    id: "c1",
    name: "عبدالرحمن بن سعود",
    phone: "0501234567",
    email: "abdulrahman@email.com",
    city: "الرياض",
    orders: 2,
    spend: 980000,
  },
  {
    id: "c2",
    name: "نورة العتيبي",
    phone: "0559876543",
    email: "noura@email.com",
    city: "جدة",
    orders: 1,
    spend: 520000,
  },
  {
    id: "c3",
    name: "خالد الشمري",
    phone: "0533344556",
    email: "khaled@email.com",
    city: "الرياض",
    orders: 3,
    spend: 1240000,
  },
  {
    id: "c4",
    name: "سارة القحطاني",
    phone: "0541122334",
    email: "sara@email.com",
    city: "الخبر",
    orders: 1,
    spend: 745000,
  },
];
