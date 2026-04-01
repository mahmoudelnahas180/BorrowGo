import api from "@/lib/axios/axios";
import { AxiosError } from "axios";

type UsersFetchOptions = {
  next?: { revalidate: number };
  cache?: "no-store";
};

type NameSearchOptions = {
  signal?: AbortSignal;
};

type UsersPaginationQuery = {
  page?: number;
  limit?: number;
};

type UsersPaginationMeta = {
  page: number;
  limit: number;
  totalUsers: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type CreateUserPayload = Record<string, unknown>;

type UsersResponseShape = {
  data?: {
    data?: {
      users?: unknown;
      user?: unknown;
    };
    user?: unknown;
  };
};

const normalizeUsersResponse = (payload: UsersResponseShape) => {
  const normalizeUserRecord = (value: Record<string, unknown>) => {
    if (value.id !== undefined && value.id !== null) return value;

    const mongoId = value._id;
    if (typeof mongoId === "string" && mongoId.trim()) {
      return { ...value, id: mongoId };
    }

    return value;
  };

  const candidates = [
    payload?.data?.data?.users,
    payload?.data?.data?.user,
    payload?.data?.user,
    payload?.data?.data,
  ];

  const matched = candidates.find(
    (value) => value !== undefined && value !== null,
  );
  if (Array.isArray(matched)) {
    return matched.map((item) =>
      normalizeUserRecord(item as Record<string, unknown>),
    );
  }

  return matched
    ? [normalizeUserRecord(matched as Record<string, unknown>)]
    : [];
};

const normalizeSingleUserResponse = (payload: UsersResponseShape) => {
  const [firstUser] = normalizeUsersResponse(payload);
  return firstUser ?? null;
};

const normalizePaginationResponse = (payload: UsersResponseShape) => {
  const users = normalizeUsersResponse(payload);
  const paginationCandidates = [
    (payload as Record<string, unknown>)?.data &&
      ((payload as Record<string, unknown>).data as Record<string, unknown>)
        ?.data &&
      ((
        ((payload as Record<string, unknown>).data as Record<string, unknown>)
          .data as Record<string, unknown>
      )?.pagination as UsersPaginationMeta | undefined),
    (payload as Record<string, unknown>)?.data &&
      (((payload as Record<string, unknown>).data as Record<string, unknown>)
        ?.pagination as UsersPaginationMeta | undefined),
  ];

  const matchedPagination = paginationCandidates.find(
    (value) => value !== undefined && value !== null,
  );

  return {
    users,
    pagination: matchedPagination,
  };
};

export const adminUsersService = () => {
  const authHeaders = (token: string) => {
    if (!token) throw new Error("Missing token");
    return { Authorization: `Bearer ${token}` };
  };

  const handleKnownErrors = (err: unknown) => {
    const axiosError = err as AxiosError;
    if (axiosError.response?.status === 401) throw new Error("Unauthorized");
    throw err;
  };

  const get = async (
    token: string,
    url: string,
    config?: Record<string, unknown>,
  ) => {
    try {
      const res = await api.get(url, {
        headers: authHeaders(token),
        ...(config || {}),
      });
      return res;
    } catch (err: unknown) {
      handleKnownErrors(err);
    }
  };

  const post = async (token: string, url: string, body: unknown) => {
    try {
      const res = await api.post(url, body, {
        headers: authHeaders(token),
      });
      return res;
    } catch (err: unknown) {
      handleKnownErrors(err);
    }
  };

  const patch = async (token: string, url: string) => {
    try {
      const res = await api.patch(
        url,
        {},
        {
          headers: authHeaders(token),
        },
      );
      return res;
    } catch (err: unknown) {
      handleKnownErrors(err);
    }
  };

  const del = async (token: string, url: string) => {
    try {
      const res = await api.delete(url, {
        headers: authHeaders(token),
      });
      return res;
    } catch (err: unknown) {
      handleKnownErrors(err);
    }
  };

  const getAdminUsers = async (token: string, options?: UsersFetchOptions) => {
    const res = await get(token, "/users/", {
      ...(options?.next ? { next: options.next } : {}),
      ...(options?.cache ? { cache: options.cache } : {}),
    });
    return res ? normalizeUsersResponse(res) : [];
  };

  const getUsersPaginated = async (
    token: string,
    query: UsersPaginationQuery,
    options?: UsersFetchOptions,
  ) => {
    const res = await get(token, "/users/", {
      params: query,
      ...(options?.next ? { next: options.next } : {}),
      ...(options?.cache ? { cache: options.cache } : {}),
    });

    return res
      ? normalizePaginationResponse(res)
      : { users: [], pagination: undefined };
  };

  const createUser = async (token: string, body: CreateUserPayload) => {
    const res = await post(token, "/users/createuser", body);
    return res?.data;
  };

  const deleteUserById = async (token: string, userId: string) => {
    const res = await del(token, `/users/${userId}`);
    return res?.data;
  };

  const getUserByName = async (
    token: string,
    name: string,
    options?: NameSearchOptions,
  ) => {
    const res = await get(token, "/users/getone/", {
      params: { name },
      ...(options?.signal ? { signal: options.signal } : {}),
    });
    return res ? normalizeUsersResponse(res) : [];
  };

  const banUser = async (token: string, userId: string) => {
    const res = await patch(token, `/users/${userId}/activate`);
    return res?.data;
  };

  const restoreUser = async (token: string, userId: string) => {
    const res = await patch(token, `/users/${userId}/deactivate`);
    return res?.data;
  };

  return {
    getAdminUsers,
    getUsersPaginated,
    createUser,
    deleteUserById,
    getUserByName,
    banUser,
    restoreUser,
  };
};
