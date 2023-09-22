import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { dateToDatePickerFormat } from "../utils";
import { OutcomeEvent } from "../../../client/src";

interface Props {
  open: boolean;
  onChange: (outcome: OutcomeEvent, date: string, comments: string) => void;
  onClose: () => void;
}
const today = dateToDatePickerFormat(new Date());

const OUTCOMES = Object.entries(OutcomeEvent);

export const OutcomeModal: React.FC<Props> = ({ open, onChange, onClose }) => {
  const [outcome, setOutcome] = useState<OutcomeEvent | null>(null);
  const [endDate, setEndDate] = useState<string>(today);
  const [comment, setComment] = useState<string>("");

  const handleendDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = () => {
    if (outcome) {
      onChange(outcome, endDate, comment);
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
        <FormControl
          variant="outlined"
          style={{ backgroundColor: "white" }}
          fullWidth
        >
          <InputLabel htmlFor="cabin-select">Outcome</InputLabel>
          <Select
            value={outcome}
            onChange={(e) => {
              setOutcome(e.target.value as OutcomeEvent);
            }}
            label="outcome"
            inputProps={{
              name: "outcome",
              id: "outcome-select",
            }}
          >
            {OUTCOMES.map(([value, label]) => (
              <MenuItem key={label} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
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
