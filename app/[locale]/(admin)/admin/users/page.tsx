import { cookies } from "next/headers";
import { adminUsersService } from "@/services/admin/admin.users.service";
import { getTranslations } from "next-intl/server";
import MainTitle from "@/components/admin/MainTitle";
import UsersClientComponent from "./UsersClientComponent";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  orders: number;
  active: boolean;
}

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return <div>Unauthorized. Please login.</div>;

  const { getAdminUsers } = adminUsersService();

  let users: UserData[] = [];
  try {
    users = (await getAdminUsers(token, {
      next: { revalidate: 60 },
    })) as unknown as UserData[];
  } catch (err) {
    console.error("Failed to fetch users:", err);
  }

  const t = await getTranslations("UsersPage");

  // Translation labels to pass to Client Component
  const labels = {
    name: t("name"),
    email: t("email"),
    role: t("role"),
    orders: t("orders"),
    active: t("active"),
    activeStatus: t("activeStatus"),
    inactiveStatus: t("inactiveStatus"),
    toggle: t("toggle"),
    delete: t("delete"),
    actions: t("actions"),
    title: t("title"),
    add: t("add"),
    searchLabel: t("searchLabel"),
    roleLabel: t("roleLabel"),
    statusFilterLabel: t("statusFilterLabel"),
    allOption: t("allOption"),
    unbanned: t("unbanned"),
    unban: t("unban"),
    userNotFoundByName: t("userNotFoundByName"),
    ban: t("ban"),
    banned: t("banned"),
    previous: t("previous"),
    next: t("next"),
    page: t("page"),
    of: t("of"),
  };

  return (
    <div className="space-y-6">
      <MainTitle title={labels.title} buttonadd={labels.add} />
      <UsersClientComponent
        initialUsers={users}
        token={token}
        labels={labels}
      />
    </div>
  );
}
