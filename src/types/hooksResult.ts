import type { StatusType } from "../constants/status";

export interface HookResult<T> {
  data: T[] | null;
  status: StatusType;
  error: string | null;
  refetch: () => Promise<void>;
}
export interface HotelResult<T> {
  data: T | null;
  status: StatusType;
  error: string | null;
  refetch: () => Promise<void>;
}
