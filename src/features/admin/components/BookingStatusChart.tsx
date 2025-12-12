import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, Typography, useTheme } from "@mui/material";

interface Props {
  data: { name: string; value: number }[];
}

export default function BookingStatusChart({ data }: Props) {
  const theme = useTheme();

  const COLORS = [
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        height: "100%",
        backgroundColor: theme.palette.customBackgrounds.glass,
      }}
    >
      <Typography fontWeight={700} mb={2} color={theme.palette.primary.main}>
        Booking Status
      </Typography>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="60%"
            outerRadius="85%"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
