export const UI_IMAGES = {
  error: "/images/error_icon.png",
  empty: "/images/empty_icon.png",
  info: "/images/info_icon.png",
  success: "/images/success_icon.png",
} as const;
export type UI_IMAGE_KEYS = keyof typeof UI_IMAGES;
