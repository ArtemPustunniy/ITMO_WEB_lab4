import React from "react";

export default function AppShell(props: { children: React.ReactNode }): React.ReactElement {
    return (
        <div className="min-h-full container-app py-6">
            {props.children}
        </div>
    );
}


