import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import type { User } from "../types/User";
import BackButton from "./BackButton";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) => res.json())
        .then(setUser);
    }
  }, [userId]);

  if (!user) {
    return (
      <Box sx={{ p: 4, color: "white" }}>
        <CircularProgress />
        <Typography mt={2}>Loading user...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#121212", color: "#ff0f", minHeight: "100vh", p: 4 }}>
      {/* <IconButton onClick={() => navigate(-1)} sx={{ color: "white", mb: 3 }}>
        <BackButton />
      </IconButton> */}
      <BackButton />

      <Paper
        sx={{
          bgcolor: "#1e1e1e",
          border: "1px solid #444",
          p: 4,
          maxWidth: "700px",
          mx: "auto",
          color: "white",
        }}
      >
        <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
          User Profile
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Username:</strong> {user.username}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Email:</strong> {user.email}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography><strong>Name:</strong> {user.name}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>
              <strong>Address :</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography><strong>Phone:</strong> {user.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Website:</strong> {user.website}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography><strong>Company:</strong> {user.company.name}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserProfile;