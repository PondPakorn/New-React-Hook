import { useState } from "react";
import {
  TextField, Grid, Button, Typography, Box, Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import React from "react";

interface Props {
  existingUsers: User[];
  onAddUser: (user: Omit<User, "id">) => void;
}

const allowedTLDs = [
  "com", "org", "net", "gov", "edu", "info", "biz",
  "co.th", "ac.th", "or.th", "go.th", "th"
];

const regex = {
  username: /^[a-zA-Z0-9_]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
  website: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/
};

const requiredFields = ["username", "name", "email"];

const AddUserForm = ({ existingUsers, onAddUser }: Props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", name: "", email: "",
    street: "", suite: "", city: "", zipcode: "",
    phone: "", website: "", company: ""
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const isEmpty = (v: string) => !v?.trim();
    const lower = (v: string) => v.trim().toLowerCase();

    // Required check
    requiredFields.forEach(f => {
      if (isEmpty(form[f as keyof typeof form]))
        newErrors[f] = `${f[0].toUpperCase() + f.slice(1)} is required`;
    });

    // Username format & duplicate
    if (!isEmpty(form.username)) {
      if (!regex.username.test(form.username))
        newErrors.username = "Only letters, numbers, underscores allowed";
      else if (existingUsers.some(u => lower(u.username) === lower(form.username)))
        newErrors.username = "Username already exists";
    }

    // Email format & duplicate
    if (!isEmpty(form.email)) {
      if (!regex.email.test(form.email))
        newErrors.email = "Invalid email format";
      else if (existingUsers.some(u => lower(u.email) === lower(form.email)))
        newErrors.email = "Email already exists";
    }

    // Website format & TLD check
    if (!isEmpty(form.website)) {
      if (!regex.website.test(form.website))
        newErrors.website = "Invalid website format";
      else if (!allowedTLDs.some(tld => lower(form.website).endsWith(`.${tld}`)))
        newErrors.website = "Invalid website format";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    onAddUser({
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
      company: { name: form.company }
    });
  };

  const textFieldProps = (name: string) => ({
    fullWidth: true,
    name,
    value: form[name as keyof typeof form],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(name, e.target.value),
    error: !!errors[name],
    helperText: errors[name],
    sx: {
      "& .MuiOutlinedInput-root": {
        color: "white",
        "& fieldset": { borderColor: "#666" },
        "&:hover fieldset": { borderColor: "#888" },
      }
    }
  });

  const fields = [
    ["Username", "username"],
    ["Name", "name"],
    ["Email", "email"],
    ["Street", "street"],
    ["Suite", "suite"],
    ["City", "city"],
    ["Zip Code", "zipcode"],
    ["Phone", "phone"],
    ["Website", "website"],
    ["Company", "company"]
  ];

  return (
    <Box sx={{ bgcolor: "#121212", minHeight: "100vh", py: 6, px: 2 }}>
      <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, bgcolor: "#1e1e1e", color: "white", borderRadius: 3 }} elevation={3}>
        <Typography variant="h5" mb={3} textAlign="center">Add New User</Typography>

        <Grid container spacing={2}>
          {fields.map(([label, name]) => (
            <React.Fragment key={name}>
              <Grid item xs={6}>
                <Typography sx={{ mb: 1 }}>{label}:</Typography>
                <TextField {...textFieldProps(name)} fullWidth />
              </Grid>

              {/* ถ้าเป็น username หรือ company ให้เติมช่องว่างอีก 1 */}
              {(name === "username" || name === "company") && (
                <Grid item xs={6} />
              )}
            </React.Fragment>
          ))}
        </Grid>
        
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddUserForm;
