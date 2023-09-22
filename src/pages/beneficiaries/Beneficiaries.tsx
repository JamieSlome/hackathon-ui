import { Box, Button, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { Beneficiary } from "../../client/src";
import { useBeneficiaryList } from "../../data";
import { BeneficiariesTable } from "./Table";

export const Beneficiaries = () => {
  const { data: users, isLoading } = useBeneficiaryList();
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
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button variant="contained" component={Link} to="/beneficiaries/new">
            New Beneficiary
          </Button>
        </Box>
        {isLoading || !users ? (
          <LinearProgress />
        ) : (
          <BeneficiariesTable data={users as Required<Beneficiary>[]} />
        )}
      </Box>
    </Box>
  );
};
