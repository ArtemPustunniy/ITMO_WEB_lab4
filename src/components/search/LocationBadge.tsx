import React from "react";

export default function LocationBadge(props: { city?: string }): React.ReactElement {
    if (!props.city) return <></>;
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm dark:bg-emerald-900/40 dark:text-emerald-200">
            <span>📍</span>
            <span>{props.city}</span>
        </div>
    );
}


