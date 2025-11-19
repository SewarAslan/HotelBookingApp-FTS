import { useState, type ReactNode } from "react";
import AdminToolbar from "../components/AdminToolbar";
import AdminTable, { type Column } from "../components/AdminTable";
import { Box, Drawer, Typography, useTheme } from "@mui/material";

type CityRow = Record<string, ReactNode>;

export default function AdminCitiesPage() {
  const theme = useTheme();

  const [rows, _setRows] = useState<CityRow[]>([
    {
      id: 1,
      name: "Nablus",
      country: "Palestine",
      hotels: 12,
      updated: "2024-01-12",
    },
    {
      id: 2,
      name: "Amman",
      country: "Jordan",
      hotels: 8,
      updated: "2024-02-01",
    },
  ]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const columns: Column[] = [
    { field: "name", headerName: "City Name" },
    { field: "country", headerName: "Country" },
    { field: "hotels", headerName: "#Hotels" },
    { field: "updated", headerName: "Updated On" },
  ];

  function handleSearch(query: string) {
    console.log("🔍 search:", query);
  }

  function handleCreate() {
    setDrawerOpen(true);
  }

  return (
    <Box>
      <AdminToolbar onSearch={handleSearch} onCreate={handleCreate} />

      <AdminTable<CityRow>
        columns={columns}
        rows={rows}
        onRowClick={(row) => {
          console.log("Row clicked:", row);
          setDrawerOpen(true);
        }}
      />

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 380,
            p: 3,
            bgcolor: theme.palette.background.paper,
            animation: theme.animations.fadeInUp,
          },
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Create / Update City
        </Typography>

        <Typography variant="body2" color="text.secondary"></Typography>
      </Drawer>
    </Box>
  );
}
