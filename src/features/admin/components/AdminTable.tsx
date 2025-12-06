import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
  onDeleteClick?: (row: T) => void;
}

export default function AdminTable<T extends Record<string, ReactNode>>({
  columns,
  rows,
  loading = false,
  onRowClick,
  onDeleteClick,
}: AdminTableProps<T>) {
  const theme = useTheme();

  if (loading)
    return <MessageCard status="loading" data={null} message="Loading..." />;

  if (!loading && rows.length === 0)
    return <MessageCard status="success" data={[]} message="No results" />;

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

            {onDeleteClick && (
              <TableCell sx={{ width: 80, fontWeight: 700 }}>Delete</TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              hover
              onClick={() => onRowClick?.(row)}
              sx={{
                cursor: onRowClick ? "pointer" : "default",
              }}
            >
              {columns.map((col) => (
                <TableCell key={col.field}>
                  {String(row[col.field] ?? "")}
                </TableCell>
              ))}

              {onDeleteClick && (
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton color="error" onClick={() => onDeleteClick(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
