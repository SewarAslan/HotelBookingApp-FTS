import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  useTheme,
  TableContainer,
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
    <Paper
      elevation={3}
      sx={{
        overflow: "hidden",
        borderRadius: 3,
        backdropFilter: "blur(12px) saturate(160%)",
        backgroundColor: theme.palette.customBackgrounds.glass,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 8px 32px rgba(0,0,0,0.05)"
            : "0 8px 32px rgba(0,0,0,0.25)",
        animation: theme.animations.fadeInUp,
      }}
    >
      <TableContainer
        sx={{
          overflowX: "auto",
          width: "100%",
        }}
      >
        <Table
          sx={{
            minWidth: 700,
          }}
        >
          <TableHead sx={{ bgcolor: theme.palette.primary.light + "22" }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    fontWeight: 700,
                    width: col.width || "auto",
                    color: theme.palette.primary.main,
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}

              {onDeleteClick && (
                <TableCell
                  sx={{
                    width: 80,
                    fontWeight: 700,
                    color: theme.palette.error.main,
                  }}
                >
                  Delete
                </TableCell>
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
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.field}>
                    {String(row[col.field] ?? "")}
                  </TableCell>
                ))}

                {onDeleteClick && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <IconButton
                      color="error"
                      onClick={() => onDeleteClick(row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
