import React, { useState, useEffect } from "react";

export default function SearchBar(props: { 
    onSubmit: (q: string) => void;
    value?: string;
}): React.ReactElement {
    const [value, setValue] = useState<string>(props.value ?? "");
    
    useEffect(() => {
        if (props.value !== undefined) {
            setValue(props.value);
        }
    }, [props.value]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit(value);
            }}
            className="flex items-center gap-2"
        >
            <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        props.onSubmit(e.target.value);
                    }}
                    placeholder="Search for your preferred city..."
                    className="search-input w-full rounded-full pl-11 pr-4 py-2.5 bg-gray-200 border border-gray-300 outline-none shadow-sm focus:ring-2 focus:ring-gray-300"
                />
            </div>
        </form>
    );
}


