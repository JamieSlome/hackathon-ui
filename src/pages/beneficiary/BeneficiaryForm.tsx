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
import React, { useMemo, useState } from "react";
import {
  Activity,
  ActivityApi,
  BeneficiaryApi,
  Configuration,
  Need,
} from "../../client/src";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import PhoneNumberTextField from "material-ui-phone-number";

import { DeleteOutline } from "@mui/icons-material";
import { cabins } from "../../constants";
import { useBeneficiaryData } from "../../data/useBeneficiaryData";
import { ActivityCompleteModal } from "./modals/ActivityCompleteModal";
import { OrganizationActivityModal } from "./modals/OrganizationActivityModal";
import { OutcomeModal } from "./modals/OutcomeModal";
import { useNavigate } from "react-router-dom";

interface Props {
  isNew?: boolean;
  userId?: string;
}

export const BeneficiaryForm: React.FC<Props> = ({ isNew, userId }) => {
  const [editing, setEditing] = useState(isNew);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [needs, setNeeds] = useState<Need[]>([]);
  const [showActivityModel, setShowActivityModel] = useState(false);
  const [activity, setActivity] = useState<Activity | null>(null);

  const {
    formData,
    setFormData,
    needsList,
    setActivities,
    activitiesList,
    orgList,
    activities,
    hasOutcome,
    needsMap,
    orgMap,
  } = useBeneficiaryData(userId);

  const [submitting, setSubmitting] = React.useState(false);
  const handleDateChange = (date: Dayjs | null) => {
    setFormData({ ...formData, dateOfBirth: date ?? null });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // onSubmit(formData);
    try {
      setSubmitting(true);
      let newActivities: Activity[] | null = null;
      let updatedActivities: Activity[] | null = null;
      if (isNew) {
        // we can just add acitivities
        newActivities = activities;
      } else {
        newActivities = activities.filter((a) => !a.id);
        updatedActivities = activities
          .filter((a) => a.id && a.endDate)
          .filter((a) => {
            const currentActivity = activitiesList?.find(
              (curA) => curA.id === a.id
            );
            return (
              currentActivity?.endDate !== a.endDate ||
              currentActivity?.comments !== a.comments
            );
          });
      }

      const beneficiaryApi = new BeneficiaryApi(
        new Configuration({
          basePath: "https://pttmuyg4gp.us-east-1.awsapprunner.com",
        })
      );
      const activitiesApi = new ActivityApi(
        new Configuration({
          basePath: "https://pttmuyg4gp.us-east-1.awsapprunner.com",
        })
      );
      let beneficiaryId = userId;
      const {
        outcome,
        outcomeComment,
        outcomeDate,
        ...beneficiaryCreationRequest
      } = formData;
      if (isNew) {
        const resp = await beneficiaryApi.createBeneficiary({
          beneficiaryCreationRequest: {
            ...beneficiaryCreationRequest,
            dateOfBirth: formData.dateOfBirth?.toDate(),
            needs: needs.map((n) => n.id!),
          },
        });
        beneficiaryId = resp.id;
      } else if (!hasOutcome && outcome && outcomeDate) {
        await beneficiaryApi.createBeneficiaryOutcome({
          id: userId!,
          createBeneficiaryOutcomeRequest: {
            outcomeEvent: outcome,
            outcomeComment,
            outcomeDate,
          },
        });
      }

      if (newActivities?.length) {
        await Promise.all(
          newActivities.map((activityCreationRequest) =>
            activitiesApi.createActivity({
              activityCreationRequest: {
                ...activityCreationRequest,
                beneficiaryId,
              },
            })
          )
        );
      }
      if (updatedActivities?.length) {
        await Promise.all(
          updatedActivities.map((activityCreationRequest) =>
            activitiesApi.createActivity({
              activityCreationRequest: {
                ...activityCreationRequest,
                beneficiaryId,
              },
            })
          )
        );
      }
      if (isNew) {
        navigate(`/beneficiaries/${beneficiaryId}/info`);
      }
    } finally {
      setSubmitting(false);
    }
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
  const randomImageId = useMemo(() => {
    return isNew
      ? ~~(50 + Math.random() * 50)
      : formData.id?.split("-")[1]?.charCodeAt(0) ?? 10;
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        sx={{
          p: 2,
          opacity: submitting ? 0.5 : 1,
          transition: "opacity .1s ease-in",
          pointerEvents: submitting ? "none" : "",
        }}
      >
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
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`https://randomuser.me/api/portraits/${
                      formData.identity?.toLocaleLowerCase().startsWith("f")
                        ? "women"
                        : "men"
                    }/${randomImageId}.jpg`}
                    height={200}
                    width={200}
                  />
                </Grid>
                <Grid item xs={10} container spacing={2}>
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
                      options={["M", "F", "Non-binary"]}
                      renderInput={(params) => (
                        <TextField
                          name="identity"
                          label="Gender Identity"
                          {...params}
                          sx={sharedStyles}
                        />
                      )}
                      value={formData.identity}
                      onChange={(_e, identity) => {
                        if (identity) {
                          setFormData({
                            ...formData,
                            identity,
                          });
                        }
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl
                      variant="outlined"
                      style={{ backgroundColor: "white" }}
                      fullWidth
                    >
                      <InputLabel htmlFor="cabin-select">
                        Cabin Number
                      </InputLabel>
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
                  const org = orgMap.get(activity.organizationId?.toString());
                  const need = needsMap.get(activity.needId?.toString());
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
                        {editing && (
                          <>
                            {userId && activity.id ? (
                              <Button
                                variant="text"
                                sx={{ whiteSpace: "nowrap" }}
                                onClick={() => {
                                  setActivity(activity);
                                }}
                              >
                                Set Complete
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
                          </>
                        )}
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
              {orgList && editing && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setShowActivityModel(true);
                    }}
                  >
                    Add Provider
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          {!isNew && (
            <Card
              sx={{
                width: "calc(100%  - 16px)",
                border: "solid 1px #ddd",
                boxShadow: "none",
                margin: "16px 0 16px 16px",
              }}
            >
              <CardMedia sx={{ marginLeft: "32px" }}>
                <h4 style={{ marginBottom: 0 }}></h4>
              </CardMedia>
              <CardContent>
                <List>
                  <ListItem sx={{ borderBottom: "solid 1px #ddd" }}>
                    <ListItemText primary="Outcome" sx={{ flexGrow: 1000 }} />
                    <ListItemText
                      primary="Date"
                      sx={{
                        marginRight: 2,
                        width: 120,
                        textAlign: "center",
                      }}
                    />
                  </ListItem>
                  {formData.outcome && (
                    <ListItem
                      key={formData.outcome}
                      sx={{ borderBottom: "solid 1px #ddd" }}
                    >
                      <ListItemText
                        primary={formData.outcome}
                        secondary={formData.outcomeComment}
                        sx={{ flexGrow: 1000 }}
                      />
                      <ListItemText
                        primary={formData.outcomeDate?.toLocaleDateString()}
                        sx={{
                          marginRight: 2,
                        }}
                      />
                    </ListItem>
                  )}
                </List>
                {editing && !formData.outcome && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowOutcomeModal(true);
                      }}
                    >
                      Add Outcome
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Button
              onClick={async (e) => {
                e.preventDefault();

                if (editing) {
                  await handleSubmit();
                  setEditing(false);
                } else {
                  setEditing(true);
                }
              }}
              variant="contained"
              sx={{ mt: 2 }}
            >
              {buttonText} beneficiary
            </Button>
          </Box>
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

      {showActivityModel && (
        <OrganizationActivityModal
          orgList={orgList!}
          open
          needsMap={needsMap}
          onChange={(organizationId, needId, startDate, comments) => {
            const alreadyExists = activities.some(
              (a) =>
                a.organizationId?.toString() === organizationId &&
                a.needId?.toString() === needId
            );
            if (!alreadyExists) {
              setActivities([
                ...activities,
                {
                  organizationId,
                  needId,
                  startDate: new Date(startDate),
                  comments,
                },
              ]);
            }
          }}
          onClose={() => {
            setShowActivityModel(false);
          }}
        />
      )}

      {showOutcomeModal && (
        <OutcomeModal
          open
          onChange={(outcome, date, comment) => {
            setFormData({
              ...formData,
              outcome,
              outcomeDate: new Date(date),
              outcomeComment: comment,
            });
          }}
          onClose={() => {
            setShowOutcomeModal(false);
          }}
        />
      )}
    </LocalizationProvider>
  );
};
