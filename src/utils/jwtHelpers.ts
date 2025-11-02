import type { DecodedUser } from "../types/User";

export function decodeJWT(token: string): DecodedUser | null {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));

    return {
      userId: Number(payload.user_id),
      givenName: payload.given_name,
      familyName: payload.family_name,
      userType: payload.userType,
    };
  } catch (error) {
    console.error("❌ Failed to decode JWT:", error);
    return null;
  }
}
