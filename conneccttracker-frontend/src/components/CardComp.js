import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CardComp = (props) => {
  const { connect } = props;
  const { user } = useSelector((state) => {
    console.log("State---->", state.auth);
    return state.auth;
  });
  return (
    <StyledCard id="Dashboard-card" user={user}>
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
        {user && (
          <>
            <Typography variant="body2" sx={{ mt: 1 }}>
              📧 {connect?.email}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              📞 {connect?.phone}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Description: {connect?.description}
            </Typography>
          </>
        )}
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  height: ${props=> props.user ? '85%;':"140px;"}
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  width: 250px;
  padding: 20px;
`;

export default CardComp;
