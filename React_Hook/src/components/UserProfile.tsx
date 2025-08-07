// src/components/UserProfile.tsx
import { Typography, Paper } from "@mui/material";
import type { User } from "../types/User";
import { Box } from "@mui/system";

interface Props {
  user: User;
}

const UserProfile = ({ user }: Props) => {
  return (
    <Paper
      sx={{
        maxWidth: 700,
        mx: "auto",
        p: 4,
        bgcolor: "#1e1e1e",
        color: "white",
        borderRadius: 3,
      }}
      elevation={3}
    >
      <Typography variant="h5" mb={3} textAlign="center">
        User Profile
      </Typography>

      <Box display="flex" justifyContent="space-between" flexWrap="wrap" rowGap={2}>
        <Typography width="100%">Username: {user.username}</Typography>


        <Typography width="48%">Name: {user.name}</Typography>
        <Typography width="48%">Email: {user.email}</Typography>

        <Typography width="100%">
          Address : {user.address?.street || "N/A"}, {user.address?.suite || "N/A"},{" "}
          {user.address?.city || "N/A"}, {user.address?.zipcode || "N/A"}
        </Typography>

        <Typography width="48%">Phone: {user.phone}</Typography>
        <Typography width="48%">Website: {user.website}</Typography>

        <Typography width="100%">Company: {user.company?.name || "N/A"}</Typography>
      </Box>
    </Paper>

  );
};

export default UserProfile;
