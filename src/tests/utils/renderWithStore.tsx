import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../src/store/store";

export function renderHookWithStore<T>(hook: () => T) {
  return renderHook(hook, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });
}
