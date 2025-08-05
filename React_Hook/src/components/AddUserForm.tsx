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
  onAddUser: (user: User) => void;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
  const errors: { [key: string]: string } = {};

  if (!form.username) errors.username = "Username is required";
  if (!form.name) errors.name = "Name is required";
  if (!form.email) errors.email = "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (form.email && !emailRegex.test(form.email)) {
    errors.email = "Invalid email format";
  }

  const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  if (form.website && !websiteRegex.test(form.website)) {
    errors.website = "Invalid website format";
  }

  if (
    existingUsers.some(
      (u) => u.username.toLowerCase() === form.username.toLowerCase()
    )
  ) {
    errors.username = "Username already exists";
  }

  if (
    existingUsers.some(
      (u) => u.email.toLowerCase() === form.email.toLowerCase()
    )
  ) {
    errors.email = "Email already exists";
  }

  return errors; // ✅ return object
};



  const handleSubmit = async () => {
  const newErrors = validate(); // ✅ รับ object
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersFromAPI: User[] = await response.json();
    const lastId = Math.max(...usersFromAPI.map(user => user.id));

    const newUser: User = {
      id: lastId + 1,
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
      }
    };

    console.log("New user added:", newUser); // ✅ log ข้อมูล
    onAddUser(newUser);
    navigate("/");

  } catch (error) {
    console.error("Error fetching users from API", error);
    alert("Error fetching users. Please try again.");
  }
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
          {[
            ["Username", "username"],
            ["Name", "name"],
            ["Email", "email"],
            ["Street", "street"],
            ["Suite", "suite"],
            ["City", "city"],
            ["Zip Code", "zipcode"],
            ["Phone", "phone"],
            ["Website", "website"],
            ["Company", "company"],
          ].map(([label, name]) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                fullWidth
                label={label}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                error={!!errors[name]}
                helperText={errors[name]}
                variant="outlined"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#555",
                    },
                    "&:hover fieldset": {
                      borderColor: "#888",
                    },
                  },
                }}
              />
            </Grid>
          ))}
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
