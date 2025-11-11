import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import MessageCard from "../../../components/MessageCard";
import { STATUS } from "../../../constants/status";
import { useSearchResults } from "../hooks/useSearchResults";
import ResultCard from "./ResultCard";
import { MUI_TYPOGRAPHY } from "../../../constants/muiTokens";
import ResultCardSkeleton from "./ResultCardSkeleton";

export default function ResultsList() {
  const theme = useTheme();
  const { data, status, error, refetch } = useSearchResults();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data]);

  if (status !== STATUS.SUCCESS) {
    if (status === STATUS.LOADING) {
      return (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            p: 3,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <ResultCardSkeleton key={i} />
          ))}
        </Box>
      );
    }

    return (
      <MessageCard
        status={status}
        error={error}
        data={data}
        message={
          status === STATUS.ERROR
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
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          animation: `${theme.animations.fadeInUp} 0.4s ease`,
        }}
      >
        {data?.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 600, md: 900 },
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
