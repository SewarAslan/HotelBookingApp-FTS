import { Box, Card, CardContent, Skeleton } from "@mui/material";

export default function ResultCardSkeleton() {
  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        borderRadius: 3,
        overflow: "hidden",
        width: "100%",
        maxWidth: 900,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: { xs: "100%", sm: 180 },
          alignSelf: "stretch",
          display: "flex",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>

      <CardContent sx={{ flex: 1, p: 2.5 }}>
        <Box>
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="text" width="30%" height={22} sx={{ mt: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="circular" width={18} height={18} />
            ))}
          </Box>
        </Box>

        <Skeleton variant="text" width="90%" height={20} sx={{ mt: 2 }} />
        <Skeleton variant="text" width="70%" height={20} />

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton variant="rectangular" width={90} height={30} />
          <Skeleton
            variant="rectangular"
            width={120}
            height={40}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
