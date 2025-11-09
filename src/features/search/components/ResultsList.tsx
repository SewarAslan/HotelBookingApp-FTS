import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import MessageCard from "../../../components/MessageCard";
import { STATUS } from "../../../constants/status";
import { useSearchResults } from "../hooks/useSearchResults";
import ResultCard from "./ResultCard";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";

export default function ResultsList() {
  const theme = useTheme();
  const { data, status, error, refetch } = useSearchResults();

  if (status !== STATUS.SUCCESS) {
    return (
      <MessageCard
        status={status}
        error={error}
        data={data}
        message={
          status === STATUS.LOADING
            ? "Loading search results..."
            : status === STATUS.ERROR
            ? "Something went wrong!"
            : "No results found."
        }
        onRetry={refetch}
      />
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 2,
        px: { xs: 1, md: 3 },
        animation: theme.animations.fadeInUp,
      }}
    >
      <Typography
        variant={MUI_TYPOGRAPHY.H5}
        fontWeight={700}
        mb={2}
        color={theme.palette.primary.main}
      >
        Search Results ({data?.length || 0})
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          rowGap: 3,
        }}
      >
        {data?.map((item, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: { xs: "100%", sm: "45%", md: "30%" },
              maxWidth: 300,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ResultCard data={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
