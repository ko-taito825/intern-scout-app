import useSWR from "swr";

export const useFetch = <T>(
  url: string | null,
  authHeaders?: Record<string, string> | null,
) => {
  const fetcher = async ([url, headersJson]: [string, string]) => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...JSON.parse(headersJson),
      },
    });
    if (!res.ok) throw new Error("データの取得に失敗しました");
    return res.json() as Promise<T>;
  };

  const headersJson = authHeaders ? JSON.stringify(authHeaders) : null;

  const { data, error, isLoading } = useSWR<T>(
    url && headersJson ? [url, headersJson] : null,
    fetcher,
  );
  return { data, error, isLoading };
};
