import { Box, Toolbar } from "@mui/material";
import React from "react";

const LayoutWrapper = ({ children }) => {
  return (
    <Box>
      <Toolbar />
      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  );
};

export default LayoutWrapper;
