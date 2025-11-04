import React from "react";
import Toggles from "./Toggles";
import SearchPanel from "../search/SearchPanel";
import type { GeoItem } from "../search/SearchSuggestions";

export default function Header(props: {
    onPickCity: (item: GeoItem) => void;
    onCurrentLocation: () => void;
}): React.ReactElement {
    return (
        <header className="mb-8">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                    <Toggles />
                </div>
                <div className="flex-1">
                    <SearchPanel onPick={props.onPickCity} />
                </div>
                <button
                    onClick={props.onCurrentLocation}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-medium shadow-sm flex-shrink-0"
                >
                    <span>📍</span>
                    <span>Current Location</span>
                </button>
            </div>
        </header>
    );
}