import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggleButton } from "../components/ThemeToggleButton";
import ThemeProviderWithToggle from "../styles/ThemeProviderWithToggle";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";

const meta: Meta<typeof ThemeToggleButton> = {
  title: "Components/ThemeToggleButton",
  component: ThemeToggleButton,
  tags: ["autodocs"],

  decorators: [
    (Story) => (
      <ThemeProviderWithToggle>
        <Box sx={{ p: 4 }}>
          <Story />
        </Box>
      </ThemeProviderWithToggle>
    ),
  ],

  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ThemeToggleButton>;

export const Default: Story = {
  name: "Toggle Button",
};

export const InsideGradientBox: Story = {
  name: "Inside Gradient Box",
  render: () => {
    const theme = useTheme();
    return (
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: theme.palette.gradient.secondary,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ThemeToggleButton />
      </Box>
    );
  },
};
export const GlassPanel: Story = {
  name: "Glass Effect Panel",
  render: () => {
    const theme = useTheme();
    return (
      <Box
        sx={{
          p: 4,
          width: 260,
          height: 160,
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          background: theme.palette.customBackgrounds.glass,
          border: `1px solid ${theme.palette.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThemeToggleButton />
      </Box>
    );
  },
};

export const InsideCard: Story = {
  name: "Inside Card Example",
  render: () => {
    const theme = useTheme();
    return (
      <Card
        sx={{
          width: 300,
          p: 2,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            color={theme.palette.primary.main}
          >
            Toggle Theme
          </Typography>

          <Typography
            variant="body2"
            mb={2}
            color={theme.palette.secondary.main}
          >
            Click the button to switch between light & dark mode.
          </Typography>

          <ThemeToggleButton />
        </CardContent>
      </Card>
    );
  },
};
