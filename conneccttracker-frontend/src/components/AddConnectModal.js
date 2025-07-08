import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addConnects } from "../Features/connects/connectSlice";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  company: "",
  city: "",
  jobProfile: "",
  isPrivate: true,
  description: "",
};

const initialErrors = {
  name: "",
  phone: "",
  email: "",
};

export const MuiAlert = React.forwardRef(function Alert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddConnectModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState(initialForm);

  const [errors, setErrors] = useState(initialErrors);

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const dispatch = useDispatch();

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;

    if (name == "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name == "name" || name == "email" || name == "phone") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = (e) => {
    setFormData(initialForm);
    setErrors(initialErrors);
  };

  const handleSubmit = async () => {
    console.log("FormData->", formData);
    if (!validate()) return;

    try {
      showToast("Connect addedd successfully", "success");
      await dispatch(addConnects(formData));
      onClose();
      handleClear();
    } catch (err) {
        console.log("Error-->",err)
      showToast("Add connect failed", "error");
    }
  };

  return (
    <>
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
        >
          {toast.message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Connect</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            {[
              {
                name: "name",
                label: "Name",
                required: true,
                error: !!errors.name,
                helperText: errors?.name,
              },
              {
                name: "phone",
                label: "Phone no",
                error: !!errors.phone,
                helperText: errors?.phone,
              },
              {
                name: "email",
                label: "Email",
                error: !!errors.email,
                helperText: errors?.email,
              },
              { name: "company", label: "Company Name" },
              { name: "city", label: "City" },
              { name: "jobProfile", label: "Job Profile" },
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  name={field.name}
                  label={field.label}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required || false}
                  error={field?.error}
                  helperText={field?.helperText}
                  inputProps={{ maxLength: field.name === "phone" && 10 }}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Visibility"
                name="isPrivate"
                value={formData.isPrivate}
                onChange={handleChange}
              >
                <MenuItem value={false}>Public</MenuItem>
                <MenuItem value={true}>Private</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
          <Button
            onClick={handleClear}
            variant="contained"
            color="text.primary"
          >
            Clear
          </Button>
          <Button onClick={onClose} variant="contained" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddConnectModal;
