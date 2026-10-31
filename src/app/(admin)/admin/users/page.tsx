import { getUsersAdmin } from "@/server/actions/user.actions";
import { RoleBadge } from "@/components/admin/StatusBadge";
import { UserRoleSelector } from "@/components/admin/UserRoleSelector";
import { formatDate } from "@/lib/utils";
import { Users, MailOpen, UserCheck, Shield } from "lucide-react";

export default async function AdminUsersPage() {
  const users = await getUsersAdmin();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-stone-900">
            User Accounts & Access Control
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Manage couple client accounts, administrator privileges, and created digital invitation portfolios.
          </p>
        </div>
      </div>

      {/* Quick Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Total Accounts
            </span>
            <p className="text-2xl font-serif font-semibold text-stone-900 mt-1">
              {users.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-amber-700">
              Administrators
            </span>
            <p className="text-2xl font-serif font-semibold text-stone-900 mt-1">
              {users.filter((u) => u.role === "ADMIN").length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Couple Clients
            </span>
            <p className="text-2xl font-serif font-semibold text-stone-900 mt-1">
              {users.filter((u) => u.role === "USER").length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-stone-200/80 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50/70 text-[11px] uppercase tracking-wider text-stone-400 font-medium border-b border-stone-100">
              <tr>
                <th className="py-3.5 px-6">User / Client</th>
                <th className="py-3.5 px-6">Email Address</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Cards Created</th>
                <th className="py-3.5 px-6">Registered On</th>
                <th className="py-3.5 px-6 text-right">Role Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-stone-50/50 transition">
                  <td className="py-4 px-6 font-medium text-stone-900 text-xs sm:text-sm">
                    {user.name || "Unnamed Client"}
                  </td>

                  <td className="py-4 px-6 font-mono text-xs text-stone-600">
                    {user.email}
                  </td>

                  <td className="py-4 px-6">
                    <RoleBadge role={user.role} />
                  </td>

                  <td className="py-4 px-6 text-xs text-stone-700">
                    <span className="font-semibold text-stone-900">
                      {user._count.invitations}
                    </span>{" "}
                    {user._count.invitations === 1 ? "invitation" : "invitations"}
                  </td>

                  <td className="py-4 px-6 text-xs text-stone-400">
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end">
                      <UserRoleSelector userId={user.id} currentRole={user.role} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

