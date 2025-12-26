import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicConnects } from "../Features/connects/connectSlice";
import styled from "styled-components";
import CardComp from "./CardComp";

const AllConnects = () => {
  const dispatch = useDispatch();
  const { publicConnects, loading, error } = useSelector((state) => {
    console.log("State---->", state.connects);
    return state.connects;
  });

  useEffect(() => {
    dispatch(fetchPublicConnects());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 2 }}>
      {loading ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        </>
      ) : error ? (
        <>
          <Typography color="error">{error}</Typography>
        </>
      ) : publicConnects?.connects?.length == 0 ? (
        <>
          <Typography>No Public Connects!!</Typography>
        </>
      ) : (
        <>
          <Grid container spacing={8}>
            {publicConnects?.connects?.map((connect) => (
              <Grid item xs={3} sm={3} md={3} key={connect._id}>
                <CardComp connect={connect} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AllConnects;
