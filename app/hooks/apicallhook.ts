"use client";
import { useEffect, useState } from "react";

type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string | unknown;
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

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(url, {
          method: options?.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
          },
          body: options?.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};
