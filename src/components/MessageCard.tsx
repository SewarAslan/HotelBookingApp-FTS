import React from "react";
import { UI_IMAGES } from "../constants/UI_IMAGES";
import { STATUS } from "../constants/status";

interface MessageCardProps {
  status: string;
  message?: string;
  error?: string | null;
  data?: unknown[] | null;
  onRetry?: () => void;
}

const MessageCard = React.memo(
  ({ status, message, error, data, onRetry }: MessageCardProps) => {
    if (status === STATUS.LOADING) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-violet-500 gap-3">
          <div className="w-10 h-10 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
          <p className="text-gray-700 text-sm font-medium">
            {message || "Loading..."}
          </p>
        </div>
      );
    }

    if (status === STATUS.ERROR) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-rose-500 gap-3">
          <img
            src={UI_IMAGES.error}
            alt="error"
            className="w-20 h-20 object-contain"
          />
          <p className="text-gray-700 text-sm font-medium">
            {error || "Something went wrong."}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-1 rounded-lg bg-violet-500 text-white px-4 py-1.5 text-sm font-medium hover:bg-violet-600 transition-all"
            >
              Retry
            </button>
          )}
        </div>
      );
    }

    if (status === STATUS.SUCCESS && Array.isArray(data) && data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
          <img
            src={UI_IMAGES.empty}
            alt="empty"
            className="w-20 h-20 object-contain"
          />
          <p className="text-gray-700 text-sm font-medium">
            {message || "No data available."}
          </p>
        </div>
      );
    }

    return null;
  }
);

MessageCard.displayName = "MessageCard";
export default MessageCard;
