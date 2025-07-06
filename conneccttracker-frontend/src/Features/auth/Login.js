import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearError, login } from "./authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => {
    console.log(state.auth);
    return state.auth;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login data=>", formData);
      dispatch(login(formData));
    }
  };

  return (
    <FormWrapper elevation={3}>
      <Typography variant="h5" gutterBottom align="center" color="primary">
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          required
        />
        <TextField
          label="Password"
          name="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          required
        />
        <LinkContainer>
          <Link href="/register" underline="hover">
            Register New User*
          </Link>
        </LinkContainer>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled(Paper)`
  width: 30%;
  margin: 40px auto;
  padding: 30px;
`;

const LinkContainer = styled.div`
  margin-top: 10px;
  text-align: end;
`;

export default Login;
