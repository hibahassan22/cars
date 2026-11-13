export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  href: string;
  read: boolean;
  type: "order" | "inventory" | "system";
};

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "طلب جديد بانتظار المتابعة",
    body: "ORD-1042 — عبدالرحمن بن سعود · مرسيدس S500",
    time: "منذ 12 دقيقة",
    href: "/sales/ORD-1042",
    read: false,
    type: "order",
  },
  {
    id: "n2",
    title: "سيارة راكدة في المخزون",
    body: "لكزس LX 600 VIP موجودة منذ 41 يومًا",
    time: "منذ ساعة",
    href: "/inventory/3",
    read: false,
    type: "inventory",
  },
  {
    id: "n3",
    title: "تم اكتمال طلب",
    body: "ORD-1039 أصبح مكتملًا",
    time: "منذ 3 ساعات",
    href: "/sales/ORD-1039",
    read: true,
    type: "order",
  },
  {
    id: "n4",
    title: "تحديث إعدادات الفرع",
    body: "تم تعديل بيانات فرع الرياض الرئيسي",
    time: "أمس",
    href: "/settings/branches/b1/edit",
    read: true,
    type: "system",
  },
];

export function unreadCount(list = notifications) {
  return list.filter((item) => !item.read).length;
}
