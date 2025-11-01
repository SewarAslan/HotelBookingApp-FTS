import React from "react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-3",
  lg: "h-12 w-12 border-4",
};

const LoadingState = React.memo(
  ({ message = "Loading...", size = "md" }: LoadingStateProps) => {
    const spinnerSize = sizeClasses[size];

    return (
      <div className="flex flex-col justify-center items-center h-full text-center text-gray-600">
        <div
          className={`animate-spin rounded-full border-t-violet-500 border-gray-200 ${spinnerSize}`}
          style={{ borderTopWidth: "4px" }}
        />

        {message && <p className="mt-3 text-sm text-gray-500">{message}</p>}
      </div>
    );
  }
);

LoadingState.displayName = "LoadingState";
export default LoadingState;
