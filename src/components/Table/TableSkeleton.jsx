import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const TableSkeleton = () => {
  var blockCount = 5;

  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-10 rounded-lg bg-secondary"></div>
      </Skeleton>
      {[...Array(blockCount)].map((_, i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="w-1/12 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="w-1/12 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="w-1/12 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
          </Skeleton>
          <Skeleton className="w-1/12 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
          </Skeleton>
        </div>
      ))}
    </Card>
  );
};

export default TableSkeleton;
