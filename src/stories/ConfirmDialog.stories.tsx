import type { Meta, StoryObj } from "@storybook/react";
import ConfirmDialog from "../features/admin/components/ConfirmDialog";
import { useEffect, useState } from "react";
import ThemeProviderWithToggle from "../styles/ThemeProviderWithToggle";
import { Box } from "@mui/material";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Admin/ConfirmDialog",
  component: ConfirmDialog,

  decorators: [
    (Story) => (
      <ThemeProviderWithToggle>
        <Box sx={{ p: 4 }}>
          <Story />
        </Box>
      </ThemeProviderWithToggle>
    ),
  ],
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    message: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    onConfirm: { action: "confirmed" },
    onClose: { action: "closed" },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmDialog>;
export const Default: Story = {
  args: {
    open: true,
    title: "Delete Item",
    message: "Are you sure you want to delete this item?",
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
  },

  render: (args) => {
    const [open, setOpen] = useState(args.open);

    useEffect(() => {
      setOpen(args.open);
    }, [args.open]);

    return (
      <ConfirmDialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    );
  },
};
export const ClosedDialog: Story = {
  name: "Closed State",
  args: {
    open: false,
    title: "Delete Item",
    message: "This dialog is closed by default.",
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
  },
};

export const OpenConfirmDialog: Story = {
  name: "Open State",
  args: {
    open: true,
    title: "Delete Item",
    message: "This dialog appears open by default.",
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
  },
};

export const DeleteWarning: Story = {
  name: "Delete Warning",
  args: {
    open: true,
    title: "Remove User",
    message: "This action cannot be undone. Are you absolutely sure?",
    confirmLabel: "Remove",
    cancelLabel: "Cancel",
  },

  render: (args) => {
    const [open, setOpen] = useState(args.open);
    useEffect(() => {
      setOpen(args.open);
    }, [args.open]);
    return (
      <ConfirmDialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    );
  },
};

export const Info: Story = {
  args: {
    open: true,
    title: "Information",
    message: "Your settings have been saved successfully.",
    confirmLabel: "OK",
    cancelLabel: "Close",
  },

  render: (args) => {
    const [open, setOpen] = useState(args.open);
    useEffect(() => {
      setOpen(args.open);
    }, [args.open]);
    return (
      <ConfirmDialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    );
  },
};
