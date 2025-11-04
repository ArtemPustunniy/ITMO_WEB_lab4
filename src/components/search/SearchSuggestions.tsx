import React from "react";

export type GeoItem = {
    name: string;
    lat: number;
    lon: number;
    state?: string;
    country: string;
};

export default function SearchSuggestions(props: {
    items: GeoItem[];
    onPick: (item: GeoItem) => void;
    loading?: boolean;
    error?: string | null;
}): React.ReactElement | null {
    if (!props.items.length && !props.loading && !props.error) return null;
    return (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white shadow-lg ring-1 ring-gray-200 overflow-hidden z-50 search-suggestions">
            {props.loading && (
                <div className="px-4 py-3 text-sm text-gray-500">Searching…</div>
            )}
            {props.error && (
                <div className="px-4 py-3 text-sm text-red-600">{props.error}</div>
            )}
            {!props.loading && !props.error && props.items.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500">No results</div>
            )}
            {props.items.map((it) => (
                <button
                    key={`${it.name}-${it.lat}-${it.lon}`}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 suggestion-item"
                    onClick={() => props.onPick(it)}
                >
                    <div className="font-medium">{it.name}</div>
                    <div className="text-xs text-gray-500">{[it.state, it.country].filter(Boolean).join(", ")}</div>
                </button>
            ))}
        </div>
    );
}


