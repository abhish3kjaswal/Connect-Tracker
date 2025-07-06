import React from "react";
import LayoutWrapper from "../components/LayoutWrapper";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MyConnects from "../components/MyConnects";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);

  const getInitials = (name) => {
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <LayoutWrapper>
      <Typography variant="h4">My Profile</Typography>
      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <MyConnects />
        <ProfileCard>
          <CardContent>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <AvatarCircle>
                  {getInitials(user?.name || user?.username)}
                </AvatarCircle>
              </Grid>
              <Grid item>
                <Typography>{user?.name}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  @{user?.username}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Label>Email</Label>
                <Typography>{user?.email}</Typography>
              </Box>
              <Box>
                <Label>Phone</Label>
                <Typography>{user?.phone || "-"}</Typography>
              </Box>
            </Box>
          </CardContent>
        </ProfileCard>
      </Box>
    </LayoutWrapper>
  );
};

const ProfileCard = styled(Card)`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 30%;
`;

const AvatarCircle = styled(Avatar)`
  background-color: #1976d2;
  width: 80px;
  height: 80px;
  font-size: 28px;
`;

const Label = styled(Typography)`
  font-weight: 500;
  color: #666;
`;

export default MyProfile;
