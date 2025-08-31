"use client";

import { MoveDown } from "lucide-react";

export default function ScrollToFeatures() {

    const handleClick = () => {
        const el = document.getElementById("features");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label="Scroll to features"
            className="mt-2 p-3 rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer transition"
        >
            <MoveDown className="animate-bounce" color="gray" />
        </button>
    );
}
