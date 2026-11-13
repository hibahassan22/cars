import { AccountForm } from "@/components/dms/AccountForm";
import { DmsShell } from "@/components/dms/DmsShell";
import { staffUsers } from "@/data/users";

export default function AccountPage() {
  const currentUser = staffUsers[0];

  return (
    <DmsShell title="حسابي" subtitle="إدارة بياناتك الشخصية وكلمة المرور">
      <AccountForm user={currentUser} />
    </DmsShell>
  );
}
