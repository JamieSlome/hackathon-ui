import { Box, Button } from "@mui/material";

import landing from "../../assets/landing.png";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(252,252,252)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={landing} />
        <Button
          component={Link}
          to="/beneficiaries"
          sx={{ fontSize: "24px", marginTop: "12px" }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};
