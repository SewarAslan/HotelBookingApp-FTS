import { Card, Box, Typography, useTheme } from "@mui/material";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 3,
        position: "relative",

        backgroundColor: theme.palette.customBackgrounds.glass,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          background: color ? `${color}22` : theme.palette.primary.main + "22",
          color: color ?? theme.palette.primary.main,
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="body2"
        color={theme.palette.primary.main}
        fontWeight={500}
      >
        {title}
      </Typography>

      {/* Value */}
      <Typography
        variant="h6"
        color={theme.palette.secondary.main}
        fontWeight={800}
        sx={{ mt: 0.5 }}
      >
        {value}
      </Typography>
    </Card>
  );
}
