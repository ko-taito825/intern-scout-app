import useSWR from "swr";

export const useFetch = <T>(
  url: string | null,
  authHeaders?: Record<string, string> | null,
) => {
  const fetcher = async ([url, headersJson]: [string, string | null]) => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(headersJson ? JSON.parse(headersJson) : {}),
      },
    });
    if (!res.ok) throw new Error("データの取得に失敗しました");
    return res.json() as Promise<T>;
  };

  const headersJson = authHeaders ? JSON.stringify(authHeaders) : null;

  const { data, error, isLoading } = useSWR<T>(
    url ? [url, headersJson] : null,
    fetcher,
  );
  return { data, error, isLoading };
};
