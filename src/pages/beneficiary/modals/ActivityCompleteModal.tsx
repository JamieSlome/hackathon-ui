import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { dateToDatePickerFormat } from "../utils";

interface Props {
  comments: string;
  open: boolean;
  onChange: (endDate: string, comments: string) => void;
  onClose: () => void;
}
const today = dateToDatePickerFormat(new Date());

export const ActivityCompleteModal: React.FC<Props> = ({
  comments: initialComments,
  open,
  onChange,
  onClose,
}) => {
  const [endDate, setEndDate] = useState<string>(today);
  const [comments, setComments] = useState<string>(initialComments);

  const handleendDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = () => {
    if (endDate) {
      onChange(endDate, comments);
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
          Select End Date
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
        <TextField
          name="comments"
          label="Comments"
          value={comments}
          onChange={(e) => {
            setComments(e.target.value);
          }}
          multiline
          rows={4}
          fullWidth
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
