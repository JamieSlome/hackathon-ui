import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { Activity, Need, Organization } from "../../client/src";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import PhoneNumberTextField from "material-ui-phone-number";

import { DeleteOutline } from "@mui/icons-material";
import { cabins } from "../../constants";
import { useBeneficiaryData } from "../../data/useBeneficiaryData";
import { ActivityCompleteModal } from "./modals/ActivityCompleteModal";
import { OrganizationActivityModal } from "./modals/OrganizationActivityModal";

interface Props {
  isNew?: boolean;
  userId?: number;
}

export const BeneficiaryForm: React.FC<Props> = ({ isNew, userId }) => {
  const [editing, setEditing] = useState(isNew);
  const [needs, setNeeds] = useState<Need[]>([]);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);

  const {
    formData,
    setFormData,
    needsList,
    setActivities,
    orgList,
    activities,
    needsMap,
    orgMap,
  } = useBeneficiaryData(userId);

  const handleDateChange = (date: Dayjs | null) => {
    setFormData({ ...formData, dateOfBirth: date ?? null });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmit(formData);
  };

  const sharedStyles: SxProps = editing
    ? {}
    : {
        pointerEvents: "none",
        "& fieldset": { border: "none" },
        "& .MuiAutocomplete-endAdornment": { display: "none" },
        "& .MuiSelect-icon": { display: "none" },
        "& [aria-label='Choose date']": { display: "none" },
      };

  let buttonText = "Add";
  if (userId) {
    buttonText = editing ? "Save" : "Edit";
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          {isNew
            ? "Beneficiary Intake"
            : `${formData.firstName} ${formData.lastName}`}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Card
            sx={{
              width: "calc(100%  - 16px)",
              border: "solid 1px #ddd",
              boxShadow: "none",
              margin: "16px 0 16px 16px",
            }}
          >
            <CardMedia sx={{ marginLeft: "32px" }}>
              <h4 style={{ marginBottom: 0 }}>Info</h4>
            </CardMedia>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!editing}
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    sx={sharedStyles}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!editing}
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    sx={sharedStyles}
                  />
                </Grid>
                <Grid item xs={3}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={handleDateChange}
                      sx={{
                        ...sharedStyles,
                        position: "relative",
                        bottom: "8px",
                      }}
                    />
                  </DemoContainer>
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    disabled={!editing}
                    freeSolo
                    options={["Male", "Female", "Non-binary"]}
                    renderInput={(params) => (
                      <TextField
                        name="identity"
                        label="Gender Identity"
                        {...params}
                        sx={sharedStyles}
                      />
                    )}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl
                    variant="outlined"
                    style={{ backgroundColor: "white" }}
                    fullWidth
                  >
                    <InputLabel htmlFor="cabin-select">Cabin Number</InputLabel>
                    <Select
                      value={formData.cabinNumber}
                      disabled={!editing}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          cabinNumber: e.target.value as number,
                        });
                      }}
                      label="cabinNumber"
                      inputProps={{
                        name: "cabinNumber",
                        id: "cabinNumber-select",
                      }}
                      sx={sharedStyles}
                    >
                      {cabins.map((cabin) => (
                        <MenuItem key={cabin} value={cabin}>
                          {cabin}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <PhoneNumberTextField
                    name="phoneNumber"
                    disabled={!editing}
                    label="Phone Number"
                    defaultCountry="us"
                    value={formData.phoneNumber ?? "123"}
                    onChange={(value) => {
                      setFormData({
                        ...formData,
                        phoneNumber: value as string,
                      });
                    }}
                    fullWidth
                    sx={sharedStyles}
                  />
                </Grid>
                <Grid item xs={12}>
                  {needsList && (
                    <>
                      <Autocomplete
                        disabled={!editing}
                        multiple
                        value={needs}
                        options={needsList}
                        getOptionLabel={(option) => option.name as string}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="needs"
                            label="Needs"
                            fullWidth
                            sx={sharedStyles}
                          />
                        )}
                        onChange={(_e, value) => {
                          setNeeds(value ?? []);
                        }}
                      />
                    </>
                  )}
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
                    sx={sharedStyles}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: "calc(100%  - 16px)",
              border: "solid 1px #ddd",
              boxShadow: "none",
              margin: "16px 0 16px 16px",
            }}
          >
            <CardMedia sx={{ marginLeft: "32px" }}>
              <h4 style={{ marginBottom: 0 }}>Providers</h4>
            </CardMedia>
            <CardContent>
              <List>
                <ListItem sx={{ borderBottom: "solid 1px #ddd" }}>
                  <ListItemText primary="Name" sx={{ flexGrow: 1000 }} />
                  <ListItemText
                    primary="Start Date"
                    sx={{
                      marginRight: 2,
                    }}
                  />
                  <ListItemText
                    primary="End Date"
                    sx={{
                      marginRight: 2,
                      width: 120,
                      textAlign: "center",
                    }}
                  />
                  <ListItemText
                    primary="Needs"
                    sx={{ width: 120, textAlign: "center" }}
                  />
                  <Box style={{ width: 120 }}> </Box>
                </ListItem>
                {activities.map((activity) => {
                  const org = orgMap.get(activity.organizationId);
                  const need = needsMap.get(activity.needId);
                  if (!org || !need) return null;

                  return (
                    <ListItem
                      key={org.id}
                      sx={{ borderBottom: "solid 1px #ddd" }}
                    >
                      <ListItemText
                        primary={org.name}
                        secondary={org.description}
                        sx={{ flexGrow: 1000 }}
                      />
                      <ListItemText
                        primary={activity.startDate?.toLocaleDateString()}
                        sx={{
                          marginRight: 2,
                        }}
                      />
                      <ListItemText
                        primary={
                          activity.endDate?.toLocaleDateString() ?? "n/a"
                        }
                        sx={{
                          marginRight: 2,
                          width: 120,
                          textAlign: "center",
                        }}
                      />
                      <ListItemText
                        primary={
                          <Chip label={need.name} style={{ marginRight: 4 }} />
                        }
                        sx={{ width: 120, textAlign: "center" }}
                      />
                      <Box sx={{ width: 120 }}>
                        {!(userId && activity.id) ? (
                          <Button
                            onClick={() => {
                              setActivity(activity);
                            }}
                          >
                            Completed?
                          </Button>
                        ) : (
                          <IconButton
                            sx={{ width: "40px" }}
                            onClick={() => {
                              setActivities(
                                activities.filter(
                                  (o) => o.organizationId !== org.id
                                )
                              );
                            }}
                          >
                            <DeleteOutline />
                          </IconButton>
                        )}
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
              {orgList && editing && (
                <>
                  <Autocomplete
                    value={null}
                    disabled={!editing}
                    options={orgList}
                    getOptionLabel={(option) =>
                      `${option.name as string} (${option
                        .needs!.map((nId) => needsMap.get(nId))
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
                        setOrganization(value);
                      }
                    }}
                  />
                </>
              )}
            </CardContent>
          </Card>
          <Grid container>
            <Grid item xs={10}>
              {editing && (
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "8px 20px",
                  }}
                >
                  <DatePicker
                    label="Effective Date"
                    value={formData.dateOfBirth}
                    onChange={handleDateChange}
                    sx={{
                      ...sharedStyles,
                      position: "relative",
                      bottom: "8px",
                    }}
                  />
                </DemoContainer>
              )}
            </Grid>
            <Grid item xs={2}>
              <Button
                onClick={() => {
                  if (editing) {
                    setEditing(false);
                  } else {
                    setEditing(true);
                  }
                }}
                variant="contained"
                sx={{ mt: 2 }}
              >
                {buttonText} Benificiary
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {activity && (
        <ActivityCompleteModal
          comments={activity.comments as string}
          open
          onChange={(endDate, comments) => {
            setActivities(
              activities.map((a) => {
                if (a.id === activity.id) {
                  return { ...a, endDate: new Date(endDate), comments };
                }
                return a;
              })
            );
          }}
          onClose={() => {
            setActivity(null);
          }}
        />
      )}

      {organization && (
        <OrganizationActivityModal
          needs={
            (organization.needs?.map((n) => needsMap.get(n)).filter(Boolean) ??
              []) as Need[]
          }
          open
          onChange={(needId, startDate, comments) => {
            const alreadyExists = activities.some(
              (a) => a.organizationId === organization.id && a.needId === needId
            );
            if (!alreadyExists) {
              setActivities([
                ...activities,
                {
                  organizationId: organization.id,
                  needId,
                  startDate: new Date(startDate),
                  comments,
                },
              ]);
            }
          }}
          onClose={() => {
            setOrganization(null);
          }}
        />
      )}
    </LocalizationProvider>
  );
};
