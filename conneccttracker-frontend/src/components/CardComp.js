import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const CardComp = (props) => {
    const { connect } = props;
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {connect.name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {connect?.jobProfile} @ {connect.company}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          📍 {connect?.city}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          📧 {connect?.email}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          📞 {connect?.phone}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Description: {connect?.description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

export default CardComp;
