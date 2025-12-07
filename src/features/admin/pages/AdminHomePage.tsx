import { Box, Typography, useTheme } from "@mui/material";
import { useAuthActions } from "../../auth";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

export default function AdminHomePage() {
  const { authUser } = useAuthActions();
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        px: 2,
      }}
    >
      <Typography
        variant={MUI_TYPOGRAPHY.H2}
        color={theme.palette.secondary.main}
      >
        Welcome {authUser?.givenName} {authUser?.familyName}
      </Typography>
      <Typography
        color={theme.palette.secondary.dark}
        variant={MUI_TYPOGRAPHY.H6}
      >
        Here you can manage cities, hotels, and rooms.
      </Typography>
    </Box>
  );
}
