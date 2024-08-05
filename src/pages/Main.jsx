// Main.jsx
import React from "react";
import ConfigTable from "../components/ConfigTable";
import TableSkeleton from "../components/TableSkeleton";

function Main() {
  return (
    <div className="h-full flex justify-center flex-col">
      <h1 className="text-2xl font-bold mb-4">Configurations</h1>
      <ConfigTable />
    </div>
  );
}

export default Main;
