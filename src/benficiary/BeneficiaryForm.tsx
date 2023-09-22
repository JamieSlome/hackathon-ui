import React, { useState } from "react";
import { Beneficiary } from "../client/src";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

export const BeneficiaryForm: React.FC<{}> = () => {
  const [formData, setFormData] = useState<
    Omit<Beneficiary, "dateOfBirth"> & { dateOfBirth: Date | null }
  >({
    id: 0,
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    identity: "",
    phoneNumber: "",
    cabinNumber: 0,
    needs: [],
    comments: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmit(formData as Beneficiary);
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>
        Beneficiary Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {/* <DatePicker
              name="dateOfBirth"
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleDateChange}
              format="yyyy-MM-dd"
              inputVariant="outlined"
              fullWidth
            /> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="identity"
              label="Identity"
              value={formData.identity}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="cabinNumber"
              label="Cabin Number"
              type="number"
              value={formData.cabinNumber}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="comments"
              label="Comments"
              value={formData.comments}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
