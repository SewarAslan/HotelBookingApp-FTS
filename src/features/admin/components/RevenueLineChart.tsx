import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography, useTheme } from "@mui/material";

interface Props {
  data: { date: string; revenue: number }[];
}

export default function RevenueLineChart({ data }: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.customBackgrounds.glass,
      }}
    >
      <Typography fontWeight={700} mb={2} color={theme.palette.primary.main}>
        Revenue Over Time
      </Typography>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={theme.palette.secondary.main}
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
