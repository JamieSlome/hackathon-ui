import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface Props {
  open: boolean;
  onChange: (endDate: string) => void;
  onClose: () => void;
}

const today = [
  new Date().getFullYear(),
  (new Date().getMonth() + 1).toString().padStart(2, "0"),
  new Date().getDate().toString().padStart(2, "0"),
].join("-");

export const ActivityCompleteModal: React.FC<Props> = ({
  open,
  onChange,
  onClose,
}) => {
  const [endDate, setEndDate] = useState<string>(today);

  const handleendDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = () => {
    if (endDate) {
      onChange(endDate);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Select Emd Date
        </Typography>
        <TextField
          label="Start Date"
          type="date"
          value={endDate}
          onChange={handleendDateChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          defaultValue={today}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            disabled={!endDate}
            variant="contained"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
