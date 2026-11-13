export type Permission =
  | "dashboard"
  | "inventory"
  | "sales"
  | "customers"
  | "reports"
  | "settings"
  | "users";

export type RoleId = "admin" | "sales" | "inventory" | "viewer";

export type StaffUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleId: RoleId;
  branchId: string;
  active: boolean;
};

export const permissionLabels: Record<Permission, string> = {
  dashboard: "الرئيسية",
  inventory: "المخزون",
  sales: "المبيعات",
  customers: "العملاء",
  reports: "التقارير",
  settings: "الإعدادات",
  users: "المستخدمين",
};

export const permissionsList = Object.keys(permissionLabels) as Permission[];

export const roles: Record<
  RoleId,
  { label: string; description: string; permissions: Permission[] }
> = {
  admin: {
    label: "مدير النظام",
    description: "صلاحية كاملة على كل الأقسام",
    permissions: [...permissionsList],
  },
  sales: {
    label: "مندوب مبيعات",
    description: "المبيعات والعملاء وعرض المخزون",
    permissions: ["dashboard", "inventory", "sales", "customers", "reports"],
  },
  inventory: {
    label: "مسؤول مخزون",
    description: "إدارة السيارات والمخزون فقط",
    permissions: ["dashboard", "inventory", "reports"],
  },
  viewer: {
    label: "مشاهدة فقط",
    description: "عرض اللوحات والتقارير بدون تعديل",
    permissions: ["dashboard", "reports"],
  },
};

export const staffUsers: StaffUser[] = [
  {
    id: "u1",
    name: "راشد العتيبي",
    email: "admin@moharrek.sa",
    phone: "0501112233",
    roleId: "admin",
    branchId: "b1",
    active: true,
  },
  {
    id: "u2",
    name: "نورة الشمري",
    email: "noura.s@moharrek.sa",
    phone: "0502223344",
    roleId: "sales",
    branchId: "b1",
    active: true,
  },
  {
    id: "u3",
    name: "فهد الغامدي",
    email: "fahad.g@moharrek.sa",
    phone: "0503334455",
    roleId: "inventory",
    branchId: "b2",
    active: true,
  },
  {
    id: "u4",
    name: "سارة الدوسري",
    email: "sara.d@moharrek.sa",
    phone: "0504445566",
    roleId: "viewer",
    branchId: "b3",
    active: false,
  },
];

export function getStaffUser(id: string) {
  return staffUsers.find((user) => user.id === id);
}

export function roleLabel(roleId: RoleId) {
  return roles[roleId].label;
}
