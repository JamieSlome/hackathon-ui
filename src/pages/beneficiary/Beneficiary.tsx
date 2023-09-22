import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { BeneficiaryForm } from ".";
import { ActivityTimeline } from "./ActivityTimeline";

export const Beneficiary: React.FC<{}> = () => {
  const { id: userId, tab } = useParams() as {
    id?: string;
    tab?: "info" | "timeline";
  };

  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/beneficiaries/${userId}/${newValue}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Info" value="info" />
        <Tab label="Timeline" value="timeline" />
      </Tabs>
      {tab === "info" && <BeneficiaryForm userId={userId} />}
      {tab === "timeline" && userId && <ActivityTimeline userId={userId} />}
    </Box>
  );
};
