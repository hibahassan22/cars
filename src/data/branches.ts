export type Branch = {
  id: string;
  name: string;
  city: string;
  address: string;
  manager: string;
  phone: string;
  capacity: number;
  active: boolean;
};

export const branches: Branch[] = [
  {
    id: "b1",
    name: "الفرع الرئيسي",
    city: "الرياض",
    address: "طريق الملك فهد، حي العليا",
    manager: "أحمد العتيبي",
    phone: "0112345678",
    capacity: 60,
    active: true,
  },
  {
    id: "b2",
    name: "فرع الدياموند",
    city: "جدة",
    address: "طريق الأمير سلطان، حي الزهراء",
    manager: "سارة الغامدي",
    phone: "0123456789",
    capacity: 40,
    active: true,
  },
  {
    id: "b3",
    name: "الفرع الشرقي",
    city: "الخبر",
    address: "الكورنيش، حي الثقبة",
    manager: "فيصل الدوسري",
    phone: "0134567890",
    capacity: 35,
    active: true,
  },
];

export function getBranch(id: string) {
  return branches.find((branch) => branch.id === id);
}
