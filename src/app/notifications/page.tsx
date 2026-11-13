import { DmsShell } from "@/components/dms/DmsShell";
import { NotificationsList } from "@/components/dms/NotificationsList";

export default function NotificationsPage() {
  return (
    <DmsShell title="الإشعارات" subtitle="تنبيهات الطلبات والمخزون والنظام">
      <NotificationsList />
    </DmsShell>
  );
}
