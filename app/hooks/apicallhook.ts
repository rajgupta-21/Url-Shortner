"use client";
import { useEffect, useState } from "react";

type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  credentials?: RequestCredentials;
};

export const useApiCall = <T = unknown>(
  url: string | null,
  options?: FetchOptions,
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(url, {
          method: options?.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
          },
          body:
            options?.body && typeof options.body !== "string"
              ? JSON.stringify(options.body)
              : (options?.body as string | undefined),
          credentials: options?.credentials || "include",
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Request failed");
        }

        setData(result);
        setError(null);
      } catch (err: unknown) {
        if ((err as any)?.name === "AbortError") return;

        setError(err instanceof Error ? err.message : "Error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // ✅ cleanup
    };
  }, [url, JSON.stringify(options)]); // ✅ track options

  return { data, error, loading };
};
