import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { id } from "date-fns/locale";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (error) {
    return true;
  }
};

export function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    const value = params[key];

    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(key, item);
      });
    } else {
      searchParams.append(key, value);
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return {
      relative: formatDistanceToNow(date, { addSuffix: true, locale: id }),
      absolute: format(date, "dd MMMM yyyy, HH:mm", { locale: id }),
    };
  } catch {
    return {
      relative: "Waktu tidak diketahui",
      absolute: "Waktu tidak diketahui",
    };
  }
} 