import React from "react";

export const ColumnSkeleton = () => {
  return <div className="w-96 rounded-md h-96 bg-base-300 animate-pulse"></div>;
};
export const BoardSkeleton = () => {
  return (
    <div className="flex flex-row space-x-24 mt-0">
      <ColumnSkeleton />
      <ColumnSkeleton />
      <ColumnSkeleton />
    </div>
  );
};
