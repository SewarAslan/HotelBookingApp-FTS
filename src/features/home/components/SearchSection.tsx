import { Box, Card, Typography, useTheme } from "@mui/material";
import { SearchForm } from "../../search/components";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

export default function SearchSection() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: theme.spacing(1),
        mt: theme.spacing(1),
        mb: theme.spacing(1),
        gap: theme.spacing(3),
        position: "relative",
        background: "none",
        overflow: "visible",
        transition: "background 0.4s ease",
        animation: theme.animations.fadeInUp,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        elevation={10}
        sx={{
          p: { xs: 2, md: 4 },
          width: "100%",
          maxWidth: 1100,
          backdropFilter: "blur(12px) saturate(160%)",
          WebkitBackdropFilter: "blur(12px) saturate(160%)",
          backgroundColor:
            theme.palette.customBackgrounds?.glass ??
            theme.palette.background.paper,
          borderBottom: `1px solid rgba(255,255,255,0.18)`,
          zIndex: theme.zIndex.appBar,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Typography
          variant={MUI_TYPOGRAPHY.H4}
          sx={{
            mb: 2,
            color: theme.palette.secondary.main,
            textAlign: "center",
            height: "56px",
          }}
        >
          Find Your Perfect Stay
        </Typography>

        <SearchForm />
      </Card>
    </Box>
  );
}
