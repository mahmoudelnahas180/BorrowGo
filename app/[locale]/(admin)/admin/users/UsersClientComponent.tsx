"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { adminUsersService } from "@/services/admin/admin.users.service";
import TableData, { Column } from "@/components/admin/TableData";
import PaginationControls from "@/components/admin/PaginationControls";
import Card from "@/components/admin/UI/Card";
import { AxiosError } from "axios";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  orders: number;
  active: boolean;
}

interface LabelsType {
  searchLabel: string;
  roleLabel: string;
  statusFilterLabel: string;
  allOption: string;
  unbanned: string;
  unban: string;
  name: string;
  email: string;
  role: string;
  orders: string;
  active: string;
  activeStatus: string;
  inactiveStatus: string;
  toggle: string;
  delete: string;
  actions: string;
  userNotFoundByName: string;
  ban: string;
  banned: string;
  previous: string;
  next: string;
  page: string;
  of: string;
}

interface UsersPaginationMeta {
  page: number;
  limit: number;
  totalUsers: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const hasUsersChanged = (prevUsers: UserData[], nextUsers: UserData[]) => {
  if (prevUsers.length !== nextUsers.length) return true;
  return JSON.stringify(prevUsers) !== JSON.stringify(nextUsers);
};

export default function UsersClientComponent({
  initialUsers,
  token,
  labels,
}: {
  initialUsers: UserData[];
  token: string;
  labels: LabelsType;
}) {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [pagination, setPagination] = useState<UsersPaginationMeta>({
    page: 1,
    limit: 5,
    totalUsers: initialUsers.length,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [searchName, setSearchName] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [banFilter, setBanFilter] = useState<"all" | "banned" | "unbanned">(
    "all",
  );
  const lastQueriedNameRef = useRef<string>("");
  const lastFetchedPageKeyRef = useRef<string>("");
  const [loading, setLoading] = useState(false);
  const [statusUpdatingUserId, setStatusUpdatingUserId] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const {
    getUsersPaginated,
    getUserByName,
    deleteUserById,
    banUser,
    restoreUser,
  } = adminUsersService();

  const getStatusStyles = (active: boolean) => {
    return active
      ? "bg-success/10 text-success border-success/20"
      : "bg-warning/10 text-warning border-warning/20";
  };

  const fetchUsersPage = useCallback(
    async (page: number, limit: number, silent = false) => {
      if (!silent) setLoading(true);
      setError(null);
      try {
        const { users: pagedUsers, pagination: pagedMeta } =
          await getUsersPaginated(token, { page, limit }, undefined);

        lastFetchedPageKeyRef.current = `${page}-${limit}`;

        const updatedUsers = pagedUsers as unknown as UserData[];
        setUsers((currentUsers) =>
          hasUsersChanged(currentUsers, updatedUsers)
            ? updatedUsers
            : currentUsers,
        );

        if (pagedMeta) {
          setPagination((current) => {
            const nextState = { ...current, ...pagedMeta };
            const isUnchanged =
              current.page === nextState.page &&
              current.limit === nextState.limit &&
              current.totalUsers === nextState.totalUsers &&
              current.totalPages === nextState.totalPages &&
              current.hasNextPage === nextState.hasNextPage &&
              current.hasPrevPage === nextState.hasPrevPage;

            return isUnchanged ? current : nextState;
          });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch users";
        setError(errorMessage);
        console.error("Error fetching users:", err);
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [token, getUsersPaginated],
  );

  const refreshUsers = useCallback(
    async (silent = false) => {
      lastFetchedPageKeyRef.current = "";
      await fetchUsersPage(pagination.page, pagination.limit, silent);
    },
    [fetchUsersPage, pagination.page, pagination.limit],
  );

  const searchUsersByName = useCallback(
    async (name: string, silent = false) => {
      const trimmedName = name.trim();
      if (!trimmedName) {
        await refreshUsers(silent);
        lastQueriedNameRef.current = "";
        return;
      }

      if (!silent) setLoading(true);
      setError(null);

      try {
        const filteredUsers = (await getUserByName(
          token,
          trimmedName,
        )) as unknown as UserData[];
        lastFetchedPageKeyRef.current = "";
        lastQueriedNameRef.current = trimmedName;
        setUsers((currentUsers) =>
          hasUsersChanged(currentUsers, filteredUsers)
            ? filteredUsers
            : currentUsers,
        );
      } catch (err) {
        const axiosError = err as AxiosError<{ message?: string }>;
        const isUserNotFound =
          axiosError.response?.status === 404 &&
          axiosError.response?.data?.message === "Not found user";

        if (isUserNotFound) {
          lastFetchedPageKeyRef.current = "";
          setUsers([]);
          setPagination((current) => ({
            ...current,
            totalUsers: 0,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
          }));
          setError(labels.userNotFoundByName);
        } else {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to search users";
          setError(errorMessage);
        }
        console.error("Error searching users:", err);
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [getUserByName, labels.userNotFoundByName, refreshUsers, token],
  );
  const handleSearchChange = useCallback((value: string) => {
    setSearchName(value);

    if (!value.trim()) {
      lastQueriedNameRef.current = "";
      lastFetchedPageKeyRef.current = "";
      setPagination((current) =>
        current.page === 1 ? current : { ...current, page: 1 },
      );
    }
  }, []);

  const deleteUser = useCallback(
    async (userId: string) => {
      if (!window.confirm("Are you sure you want to delete this user?")) return;

      setLoading(true);
      setError(null);
      try {
        await deleteUserById(token, userId);
        setUsers((currentUsers) =>
          currentUsers.filter((user) => user.id !== userId),
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete user";
        setError(errorMessage);
        console.error("Error deleting user:", err);
      } finally {
        setLoading(false);
      }
    },
    [token, deleteUserById],
  );

  const toggleUserActiveStatus = useCallback(
    async (userId: string, isCurrentlyActive: boolean) => {
      setStatusUpdatingUserId(userId);
      setError(null);

      try {
        if (isCurrentlyActive) {
          await banUser(token, userId);
        } else {
          await restoreUser(token, userId);
        }

        setUsers((currentUsers) =>
          currentUsers.map((user) =>
            user.id === userId ? { ...user, active: !isCurrentlyActive } : user,
          ),
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update user status";
        setError(errorMessage);
        console.error("Error toggling user status:", err);
      } finally {
        setStatusUpdatingUserId(null);
      }
    },
    [token, banUser, restoreUser],
  );

  const changePage = useCallback(
    (nextPage: number) => {
      if (loading) return;

      setPagination((current) => ({
        ...current,
        page:
          nextPage < 1
            ? current.page
            : nextPage > current.totalPages
              ? current.page
              : nextPage === current.page
                ? current.page
                : nextPage,
      }));
    },
    [loading],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmedName = searchName.trim();

      // Only query when user stops typing and the term actually changed.
      if (trimmedName && trimmedName !== lastQueriedNameRef.current) {
        searchUsersByName(trimmedName);
      } else if (!trimmedName && lastQueriedNameRef.current) {
        lastQueriedNameRef.current = "";
        if (pagination.page === 1) {
          refreshUsers(true);
        } else {
          changePage(1);
        }
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    searchName,
    searchUsersByName,
    pagination.page,
    refreshUsers,
    changePage,
  ]);

  useEffect(() => {
    if (searchName.trim()) return;

    const fetchKey = `${pagination.page}-${pagination.limit}`;
    if (lastFetchedPageKeyRef.current === fetchKey) return;

    refreshUsers(true);
  }, [pagination.page, pagination.limit, searchName, refreshUsers]);

  const displayedUsers = useMemo(() => {
    return users.filter((user) => {
      const roleMatches = roleFilter === "all" || user.role === roleFilter;
      const banMatches =
        banFilter === "all" ||
        (banFilter === "banned" ? !user.active : user.active);

      return roleMatches && banMatches;
    });
  }, [users, roleFilter, banFilter]);

  const columns: Column<UserData>[] = useMemo(
    () => [
      { header: labels.name, accessor: "name" },
      { header: labels.email, accessor: "email" },
      { header: labels.role, accessor: "role" },
      { header: labels.orders, accessor: "orders" },
      {
        header: labels.active,
        accessor: (row) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles(
              row.active,
            )}`}>
            {row.active ? labels.activeStatus : labels.inactiveStatus}
          </span>
        ),
        align: "center" as const,
      },
      {
        header: labels.actions,
        accessor: (row) => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => toggleUserActiveStatus(row.id, row.active)}
              disabled={loading || statusUpdatingUserId === row.id}
              className={`px-4 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-50 ${
                row.active
                  ? "border-warning bg-warning text-warning-text hover:bg-warning/90"
                  : "border-success bg-success text-white hover:bg-success-dark"
              }`}>
              {row.active ? labels.ban : labels.unban}
            </button>
            <button
              onClick={() => deleteUser(row.id)}
              disabled={loading}
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-error bg-error text-error-text text-xs font-bold whitespace-nowrap hover:bg-error/90 transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-50">
              {labels.delete}
            </button>
          </div>
        ),
        align: "right" as const,
      },
    ],
    [labels, loading, statusUpdatingUserId, toggleUserActiveStatus, deleteUser],
  );

  return (
    <div className="space-y-4">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-2">
            <label
              htmlFor="search"
              className="block text-sm font-bold text-text-primary">
              {labels.searchLabel}
            </label>
            <input
              id="search"
              type="text"
              value={searchName}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={labels.searchLabel}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-text-primary outline-none focus:ring-2 focus:ring-button-primary/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-text-primary">
              {labels.roleLabel}
            </label>
            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value as "all" | "admin" | "user")
              }
              className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-text-primary outline-none focus:ring-2 focus:ring-button-primary/20">
              <option value="all">{labels.allOption}</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-text-primary">
              {labels.statusFilterLabel}
            </label>
            <select
              value={banFilter}
              onChange={(e) =>
                setBanFilter(e.target.value as "all" | "banned" | "unbanned")
              }
              className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-text-primary outline-none focus:ring-2 focus:ring-button-primary/20">
              <option value="all">{labels.allOption}</option>
              <option value="banned">{labels.banned}</option>
              <option value="unbanned">{labels.unbanned}</option>
            </select>
          </div>
        </div>
        {searchName && (
          <div className="mt-3">
            <button
              onClick={() => handleSearchChange("")}
              disabled={loading}
              className="px-4 py-2 border border-border rounded-lg font-bold text-text-primary hover:bg-bg disabled:opacity-50">
              Clear
            </button>
          </div>
        )}
      </Card>

      <button
        onClick={() => refreshUsers()}
        disabled={loading}
        className="px-4 py-2 bg-button-primary text-button-primary-text rounded-lg font-bold hover:bg-button-primary-hover disabled:opacity-50 transition-all">
        {loading ? "Loading..." : "Refresh Users"}
      </button>

      {displayedUsers.length > 0 ? (
        <TableData data={displayedUsers} columns={columns} />
      ) : (
        <div
          className={`text-center py-8 ${
            error ? "text-error" : "text-text-secondary"
          }`}>
          {error || "No users found"}
        </div>
      )}

      {!searchName.trim() && (
        <PaginationControls
          page={pagination.page}
          totalPages={pagination.totalPages}
          hasPrevPage={pagination.hasPrevPage}
          hasNextPage={pagination.hasNextPage}
          loading={loading}
          labels={{
            previous: labels.previous,
            next: labels.next,
            page: labels.page,
            of: labels.of,
          }}
          onPrevious={() => changePage(Math.max(1, pagination.page - 1))}
          onNext={() => changePage(pagination.page + 1)}
          onPageChange={changePage}
        />
      )}
    </div>
  );
}
