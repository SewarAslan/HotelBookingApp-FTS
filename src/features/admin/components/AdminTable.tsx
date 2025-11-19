import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  useTheme,
} from "@mui/material";
import MessageCard from "../../../components/MessageCard";
import type { ReactNode } from "react";

export interface Column {
  field: string;
  headerName: string;
  width?: number;
}

interface AdminTableProps<T extends Record<string, ReactNode>> {
  columns: Column[];
  rows: T[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
}

export default function AdminTable<T extends Record<string, ReactNode>>({
  columns,
  rows,
  loading = false,
  onRowClick,
}: AdminTableProps<T>) {
  const theme = useTheme();

  if (loading)
    return (
      <MessageCard status="loading" message="Loading data..." data={null} />
    );

  if (!loading && rows.length === 0)
    return (
      <MessageCard status="success" data={[]} message="No results found." />
    );

  return (
    <Paper sx={{ overflow: "hidden", borderRadius: 3 }}>
      <Table>
        <TableHead sx={{ bgcolor: theme.palette.primary.light + "22" }}>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                sx={{ fontWeight: 700, width: col.width || "auto" }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              hover
              onClick={() => onRowClick && onRowClick(row)}
              sx={{ cursor: onRowClick ? "pointer" : "default" }}
            >
              {columns.map((col) => (
                <TableCell key={col.field}>{row[col.field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
