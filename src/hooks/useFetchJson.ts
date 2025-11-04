import { useEffect, useState } from "react";

export function useFetchJson<T>(url?: string | null, deps: unknown[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) return;
        const controller = new AbortController();
        const { signal } = controller;
        setLoading(true);
        setError(null);
        fetch(url, { signal })
            .then(async (r) => {
                if (!r.ok) throw new Error(`${r.status}`);
                return (await r.json()) as T;
            })
            .then((json) => {
                setData(json);
            })
            .catch((e) => {
                if (e?.name === "AbortError") return;
                setError(e.message ?? String(e));
            })
            .finally(() => setLoading(false));
        return () => {
            controller.abort();
        };
    }, deps);

    return { data, loading, error } as const;
}


