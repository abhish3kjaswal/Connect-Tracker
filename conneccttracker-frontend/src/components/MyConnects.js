import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnects } from "../Features/connects/connectSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardComp from "./CardComp";

const MyConnects = () => {
  const dispatch = useDispatch();
  const { myConnects, loading, error } = useSelector((state) => {
    console.log(state.connects);
    return state.connects;
  });

  const connectsRev = myConnects?.connects || [];

  useEffect(() => {
    dispatch(fetchConnects());
  }, [dispatch]);

  return (
    <Box sx={{ width: "60%" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <>
          <Typography color="error">{error}</Typography>
        </>
      ) : myConnects?.connects?.length == 0 ? (
        <>You haven't added any connects yet.</>
      ) : (
        <List disablePadding>
          {connectsRev?.length &&
            [...connectsRev]?.reverse()?.map((connect) => (
              <Box key={connect._id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight={600}>
                        {connect.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {connect.jobProfile}
                      </Typography>
                    }
                  />
                </ListItem>

                <Box sx={{ px: 3, pb: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Email:</strong> {connect.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Phone:</strong> {connect.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Company:</strong> {connect.company}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>City:</strong> {connect.city}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Visibility:</strong>{" "}
                        {connect.isPrivate.toString() || false}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Description:</strong> {connect.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
        </List>
      )}
    </Box>
  );
};

export default MyConnects;
