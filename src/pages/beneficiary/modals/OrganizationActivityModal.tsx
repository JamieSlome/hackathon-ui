import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Need } from "../../../client/src";
import { dateToDatePickerFormat } from "../utils";

interface Props {
  needs: Need[];
  open: boolean;
  onChange: (needId: number, startDate: string, comments: string) => void;
  onClose: () => void;
}

interface NeedOption {
  value: number;
  label: string;
}

const today = dateToDatePickerFormat(new Date());

export const OrganizationActivityModal: React.FC<Props> = ({
  needs,
  open,
  onChange,
  onClose,
}) => {
  const [selectedNeed, setSelectedNeed] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>(today);
  const [comments, setComments] = useState<string>("");

  const needOptions: NeedOption[] = needs.map((need) => ({
    value: need.id!,
    label: need.name!,
  }));

  const handleNeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNeed(Number(event.target.value));
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedNeed && startDate) {
      onChange(selectedNeed, startDate, comments);
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
          Select Need and Start Date
        </Typography>
        <TextField
          select
          label="Need"
          value={selectedNeed ?? ""}
          onChange={handleNeedChange}
          fullWidth
          margin="normal"
        >
          {needOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          fullWidth
          defaultValue={today}
          margin="normal"
          InputLabelProps={{ shrink: true }}
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
            disabled={!selectedNeed || !startDate}
            variant="contained"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
