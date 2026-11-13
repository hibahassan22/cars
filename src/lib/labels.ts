import type { CarStatus, OrderStatus, PaymentMethod } from "@/data/types";

export const carStatusLabel: Record<CarStatus, string> = {
  available: "جاهزة للبيع",
  reserved: "محجوزة",
  prep: "قيد التجهيز",
  sold: "مباعة",
};

export const carStatusTone: Record<
  CarStatus,
  "success" | "warning" | "info" | "neutral"
> = {
  available: "success",
  reserved: "warning",
  prep: "info",
  sold: "neutral",
};

export const orderStatusLabel: Record<OrderStatus, string> = {
  partial: "جزئي",
  completed: "مكتمل",
};

export const orderStatusTone: Record<
  OrderStatus,
  "success" | "warning" | "info" | "neutral" | "danger"
> = {
  partial: "warning",
  completed: "success",
};

export const paymentLabel: Record<PaymentMethod, string> = {
  cash: "نقدي",
  electronic: "دفع إلكتروني",
};
