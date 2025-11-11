import { Box, Skeleton, Card, CardContent } from "@mui/material";

export default function ResultCardSkeleton() {
  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 3,
        overflow: "hidden",
        p: 0,
      }}
    >
      <Skeleton variant="rectangular" height={160} animation="wave" />
      <CardContent>
        <Skeleton variant="text" width="80%" height={28} />
        <Skeleton variant="text" width="60%" height={20} />
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="text" width="30%" height={24} />
        </Box>
      </CardContent>
    </Card>
  );
}
