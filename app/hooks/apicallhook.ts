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

  // Serialize the options so the effect only re-runs when they actually change.
  const optionsKey = JSON.stringify(options ?? {});

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
        if (err instanceof Error && err.name === "AbortError") return;

        setError(err instanceof Error ? err.message : "Error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
    // `options` is intentionally tracked via `optionsKey` above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, optionsKey]);
  return { data, error, loading };
};
