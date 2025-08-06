import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Paper } from "@mui/material";
import type { User } from "../types/User";
import BackButton from "./BackButton";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const localData = localStorage.getItem("users");
        if (localData) {
          const localUsers: User[] = JSON.parse(localData);
          const foundUser = localUsers.find((u) => u.id === Number(id));
          if (foundUser) {
            setUser(foundUser);
            return;
          }
        }

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error("User not found");
        }

        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return (
      <Box sx={{ color: "white", p: 4 }}>
        <Typography variant="h6">User not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#121212", minHeight: "100vh", py: 6, px: 2 }}>
      <BackButton />
      <Paper
        sx={{
          maxWidth: 600,
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

        <Typography>Name: {user.name}</Typography>
        <Typography>Username: {user.username}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Website: {user.website}</Typography>
        <Typography>Street: {user.address?.street || "N/A"}</Typography>
        <Typography>Suite: {user.address?.suite || "N/A"}</Typography>
        <Typography>City: {user.address?.city || "N/A"}</Typography>
        <Typography>Zipcode: {user.address?.zipcode || "N/A"}</Typography>
        <Typography>Company: {user.company?.name || "N/A"}</Typography>
      </Paper>
    </Box>
  );
};

export default UserProfile;
