import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  useEffect(() => {
    cleanFormData();
  }, []);

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

    const { password, confirmPassword } = formData;

    const newErrors = {};

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 6 characters and include a lowercase letter, uppercase letter, and a special character.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("handle submit-->", formData);
    }
  };

  console.log("error-->", error);

  return (
    <FormWrapper>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Register User
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
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
          onChange={handleChange}
          required
        />
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
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
          <Link href="/register" underline="hover">
            Login existing user
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
  width: 50%;
  margin: 40px auto;
  padding: 30px;
`;

const LinkContainer = styled.div``;
export default Register;
