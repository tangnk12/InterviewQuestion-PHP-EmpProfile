import React from "react";

const Sidebar = ({ setPage }) => {
    return (
        <div className="h-screen w-48 bg-gray-800 text-white flex flex-col p-4 space-y-4">
            <button
                className="hover:bg-gray-700 p-2 rounded"
                onClick={() => setPage("form")}
            >
                Form
            </button>
            <button
                className="hover:bg-gray-700 p-2 rounded"
                onClick={() => setPage("list")}
            >
                List
            </button>
        </div>
    );
};

export default Sidebar;