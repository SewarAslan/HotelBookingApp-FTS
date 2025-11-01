export const UI_IMAGES = {
  error: "src/assets/error_icon.png",
  empty: "src/assets/empty_icon.png",
  info: "src/assets/info_icon.png",
  success: "src/assets/success_icon.png",
} as const;
export type UI_IMAGE_KEYS = keyof typeof UI_IMAGES;
