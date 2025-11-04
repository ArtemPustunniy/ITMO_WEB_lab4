import React, { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import SearchSuggestions from "./SearchSuggestions";
import type { GeoItem } from "./SearchSuggestions";
import { geocodeCity } from "../../services/owm";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetchJson } from "../../hooks/useFetchJson";

export default function SearchPanel(props: {
    onPick: (item: GeoItem) => void;
}): React.ReactElement {
    const [query, setQuery] = useState<string>("");
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const debounced = useDebounce(query, 400);
    const url = useMemo(() => (debounced ? geocodeCity(debounced) : null), [debounced]);
    const { data, loading, error } = useFetchJson<GeoItem[]>(url ?? undefined, [url]);

    const handlePick = (item: GeoItem) => {
        props.onPick(item);
        setQuery("");
        setShowSuggestions(false);
    };

    return (
        <div className="relative">
            <SearchBar 
                onSubmit={(q) => {
                    setQuery(q);
                    setShowSuggestions(q.length > 0);
                }}
                value={query}
            />
            {showSuggestions && (
                <SearchSuggestions 
                    items={data ?? []} 
                    loading={loading} 
                    error={error} 
                    onPick={handlePick} 
                />
            )}
        </div>
    );
}


