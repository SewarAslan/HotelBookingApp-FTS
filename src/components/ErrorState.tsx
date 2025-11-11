import React from "react";
import errorIcon from "../assets/error_icon.png";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState = React.memo(({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-rose-500">
      <div className="w-20 h-20">
        <img
          src={errorIcon}
          alt="error icon"
          className="w-full h-full object-contain"
        />
      </div>

      <p className="text-base font-medium text-gray-700">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 rounded-lg bg-violet-500 text-white px-4 py-1.5 text-sm font-medium hover:bg-violet-600 transition-all"
        >
          Retry
        </button>
      )}
    </div>
  );
});

ErrorState.displayName = "ErrorState";
export default ErrorState;
