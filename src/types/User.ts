export interface DecodedUser {
  userId: number;
  givenName: string;
  familyName: string;
  userType: "Admin" | "User";
}
