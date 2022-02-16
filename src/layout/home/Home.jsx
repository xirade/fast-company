import React from "react";
import useMockData from "src/utils/useMockData";

export default function Home() {
    const { initialize, status, progress, error } = useMockData();
    const handleClick = () => {
        initialize();
    };

    return (
        <div className="container mt-5">
            <h1>Home</h1>
            <h3>Initial data to Firebase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>Error: {error}</li>}
            </ul>
            <button disabled onClick={handleClick} className="btn btn-primary">
                Initialize
            </button>
        </div>
    );
}
