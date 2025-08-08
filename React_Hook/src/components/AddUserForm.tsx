import { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";

interface Props {
  existingUsers: User[];
  onAddUser: (user: Omit<User, "id">) => void;
}

const AddUserForm = ({ existingUsers, onAddUser }: Props) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    phone: "",
    website: "",
    company: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    const isEmpty = (value: string | undefined | null) => !value?.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    // ---- Validate Username ----
    if (isEmpty(form.username)) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    } else if (
      existingUsers.some(
        (u) => u.username.trim().toLowerCase() === form.username.trim().toLowerCase()
      )
    ) {
      newErrors.username = "Username already exists";
    }

    // ---- Validate Name ----
    if (isEmpty(form.name)) {
      newErrors.name = "Name is required";
    }

    // ---- Validate Email ----
    if (isEmpty(form.email)) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Invalid email format";
    } else if (
      existingUsers.some(
        (u) => u.email.trim().toLowerCase() === form.email.trim().toLowerCase()
      )
    ) {
      newErrors.email = "Email already exists";
    }

    // ---- Validate Website (optional) ----
    if (form.website && !websiteRegex.test(form.website.trim())) {
      newErrors.website = "Invalid website format";
    }

    return newErrors;
  };


  const handleSubmit = () => {
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const newUser: Omit<User, "id"> = {
      username: form.username,
      name: form.name,
      email: form.email,
      address: {
        street: form.street,
        suite: form.suite,
        city: form.city,
        zipcode: form.zipcode,
      },
      phone: form.phone,
      website: form.website,
      company: {
        name: form.company,
      },
    };

    console.log("📦 Submitting new user (no id):", newUser);
    onAddUser(newUser);
  };

  return (
    <Box sx={{ bgcolor: "#121212", minHeight: "100vh", py: 6, px: 2 }}>
      <Paper
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: 4,
          bgcolor: "#1e1e1e",
          color: "white",
          borderRadius: 3,
        }}
        elevation={3}
      >
        <Typography variant="h5" mb={3} textAlign="center">
          Add New User
        </Typography>

        <Grid container spacing={2}>
          {/* Username - Full width */}
          <Grid item xs={12}>
            <Typography sx={{ mb: 1 }}>Username:</Typography>
            <TextField
              fullWidth
              name="username"
              value={form.username}
              onChange={(e) => handleChange('username', e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  width: "49%",
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#888" },
                },
              }}
            />
          </Grid>

          {/* Other fields - 50% width each */}
          {[
            ["Name", "name"],
            ["Email", "email"],
            ["Street", "street"],
            ["Suite", "suite"],
            ["City", "city"],
            ["Zip Code", "zipcode"],
            ["Phone", "phone"],
            ["Website", "website"],
          ].map(([label, name]) => (
            <Grid item xs={6} key={name}>
              <Typography sx={{ mb: 1 }}>{label}:</Typography>
              <TextField
                fullWidth
                name={name}
                value={form[name as keyof typeof form]}
                onChange={(e) => handleChange(name, e.target.value)}
                error={!!errors[name]}
                helperText={errors[name]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "#666" },
                    "&:hover fieldset": { borderColor: "#888" },
                  },
                }}
              />
            </Grid>
          ))}

          {/* Company - Full width */}
          <Grid item xs={12}>
            <Typography sx={{ mb: 1 }}>Company:</Typography>
            <TextField
              fullWidth
              name="company"
              value={form.company}
              onChange={(e) => handleChange('company', e.target.value)}
              error={!!errors.company}
              helperText={errors.company}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  width: "49%",
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#888" },
                },
              }}
            />
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddUserForm;
