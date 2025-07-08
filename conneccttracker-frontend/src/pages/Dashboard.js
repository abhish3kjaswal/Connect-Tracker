import React from "react";
import LayoutWrapper from "../components/LayoutWrapper";
import { Divider, Typography } from "@mui/material";
import AllConnects from "../components/AllConnects";

const Dashboard = () => {
  return (
    <LayoutWrapper>
      <Typography variant="h4">Welcome to ConnecctTracker Dashboard</Typography>
      <Divider sx={{ my: 3 }} />
      <AllConnects />
    </LayoutWrapper>
  );
};

export default Dashboard;
