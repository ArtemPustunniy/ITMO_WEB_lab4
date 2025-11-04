import React from "react";

export function Loader(): React.ReactElement {
    return <div className="p-6 text-center">Loading…</div>;
}

export function ErrorState(props: { message?: string }): React.ReactElement {
    return <div className="p-6 text-center text-red-600">{props.message ?? "Error"}</div>;
}

export function EmptyState(props: { message?: string }): React.ReactElement {
    return <div className="p-6 text-center text-gray-500">{props.message ?? "No data"}</div>;
}


