// src/pages/UserProfilePage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import type { User } from "../types/User";
import UserProfile from "../components/UserProfile";

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = (localUsers as User[]).find((u) => u.id === Number(id));

      if (foundUser) {
        setUser(foundUser);
      } else {
        try {
          const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
          if (!res.ok) throw new Error("User not found");
          const apiUser = await res.json();
          setUser(apiUser);
        } catch (err) {
          console.error("Error fetching user", err);
        }
      }
    };

    fetchUser();
  }, [id]);

  return (
    <Box sx={{ bgcolor: "#121212", minHeight: "100vh", py: 6, px: 2 }}>
      {user ? (
        <UserProfile user={user} />
      ) : (
        <Typography color="white" p={4}>
          User not found
        </Typography>
      )}
    </Box>
  );
};

export default UserProfilePage;
