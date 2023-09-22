import { Box, Button, Paper, Typography } from "@mui/material";

import landing from "../../assets/landing.png";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 60px)",
        display: "flex",
        gap: "1em",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(252,252,252)",
        flexDirection: "column",
      }}
    >
      <Typography color="rgba(0,0,0,0.67)" variant="h4">
        Welcome Home
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          py: 4,
        }}
      >
        <img style={{ borderRadius: "50%" }} width={300} src={landing} />
        <Button
          component={Link}
          to="/beneficiaries"
          sx={{ fontSize: "24px", marginTop: "12px" }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};
