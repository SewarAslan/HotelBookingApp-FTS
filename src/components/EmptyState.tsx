import React from "react";
import emptyIcon from "../assets/empty_icon.png";

interface EmptyStateProps {
  message: string;
}

const EmptyState = React.memo(({ message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-2">
      <div className="w-24 h-24 flex items-center justify-center">
        <img src={emptyIcon} alt="empty icon" />
      </div>

      <p className="text-sm font-medium">{message}</p>
    </div>
  );
});

EmptyState.displayName = "EmptyState";
export default EmptyState;
