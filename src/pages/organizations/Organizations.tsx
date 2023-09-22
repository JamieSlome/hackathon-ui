import { Box, Button, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { Organization } from "../../client/src";
import { useOrganizationList } from "../../data/useOrganizationList";
import { OrganizationsTable } from "./Table";

export const Organizations = () => {
  const { data: orgs, isLoading } = useOrganizationList();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: 2,
          }}
        >
          <Button variant="contained" component={Link} to="/beneficiaries/new">
            New Organization
          </Button>
        </Box>

        {isLoading || !orgs ? (
          <LinearProgress />
        ) : (
          <OrganizationsTable data={orgs as Required<Organization>[]} />
        )}
      </Box>
    </Box>
  );
};
