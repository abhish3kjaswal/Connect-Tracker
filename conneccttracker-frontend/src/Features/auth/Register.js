import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { register } from "./authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const { loading, authError } = useSelector((state) => state.auth);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    return regex.test(password);
  };

  const cleanFormData = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      username: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("name->", name);
    console.log("value->", value);

    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // cleanFormData();

    const { name, username, email, password, confirmPassword } = formData;

    const newErrors = {};

    if (!name) {
      newErrors.name = "Name cannot be empty";
    } else if (!email) {
      newErrors.email = "Email cannot be empty";
    } else if (!username) {
      newErrors.username = "Username cannot be empty";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 6 characters and include a lowercase letter, uppercase letter, and a special character.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("handle submit-->", formData);
      dispatch(register(formData));
    }
  };

  console.log("error-->", error);

  return (
    <FormWrapper>
      {error.general && <Alert severity="error">{error.general}</Alert>}

      <Typography variant="h4" gutterBottom align="center" color="primary">
        Register User
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          error={!!error.name}
          helperText={error.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          error={!!error.email}
          helperText={error.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          error={!!error.username}
          helperText={error.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
          error={!!error.password}
          helperText={error.password}
          required
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
          error={!!error.confirmPassword}
          helperText={error.confirmPassword}
          required
        />
        <LinkContainer>
          <Link href="/" underline="hover">
            Login Existing User*
          </Link>
        </LinkContainer>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled(Paper)`
  width: 35%;
  margin: 40px auto;
  padding: 30px;
`;

const LinkContainer = styled.div`
  margin-top: 10px;
  text-align: end;
`;

export default Register;
