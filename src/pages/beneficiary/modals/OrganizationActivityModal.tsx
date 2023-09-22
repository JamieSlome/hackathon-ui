import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Need, Organization } from "../../../client/src";
import { dateToDatePickerFormat } from "../utils";

interface Props {
  needsMap: Map<string | undefined, Need>;
  open: boolean;
  onChange: (
    organizationId: string,
    needId: string,
    startDate: string,
    comments: string
  ) => void;
  onClose: () => void;
  orgList: Organization[];
}

interface NeedOption {
  value: string;
  label: string;
}

const today = dateToDatePickerFormat(new Date());

export const OrganizationActivityModal: React.FC<Props> = ({
  needsMap,
  open,
  onChange,
  onClose,
  orgList,
}) => {
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>(today);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [comments, setComments] = useState<string>("");

  const needs = (organization?.needs
    ?.map((n) => needsMap.get(n.toString()))
    .filter(Boolean) ?? []) as Need[];

  const needOptions: NeedOption[] = needs.map((need) => ({
    value: need.id!,
    label: need.name!,
  }));

  const handleNeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNeed(event.target.value);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleSubmit = () => {
    if (organization && selectedNeed && startDate) {
      onChange(organization.id!, selectedNeed, startDate, comments);
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
        <Autocomplete
          value={organization}
          options={orgList}
          getOptionLabel={(option) =>
            `${option.name as string} (${option
              .needs!.map((nId) => needsMap.get(nId?.toString()))
              .map((need) => need?.name)
              .join(", ")})`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              name="organizations"
              label="Organizations"
              fullWidth
            />
          )}
          onChange={(_e, value) => {
            if (value) {
              setOrganization(value ?? null);
            }
          }}
        />
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
