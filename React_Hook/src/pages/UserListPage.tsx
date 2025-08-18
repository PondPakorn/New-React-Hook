import { useEffect, useState } from "react";
import UserList from "../components/UserList";
import type { User } from "../types/User";
import { Box, Button, Typography } from "@mui/material";
import SearchBox from "../components/SearchBox";
import { useNavigate } from "react-router-dom";


const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch users");

        const apiUsers: User[] = await res.json();

        const localData = localStorage.getItem("users");
        let localUsers: User[] = [];

        try {
          const parsed = JSON.parse(localData || "[]");
          if (Array.isArray(parsed)) {
            localUsers = parsed;
          } else {
            console.warn("Invalid local users format");
          }
        } catch (e) {
          console.error("Failed to parse local users", e);
        }

        setUsers([...apiUsers, ...localUsers]);
      } catch (err) {
        setError("Failed to load users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    fetchData();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name}${user.username}${user.email}`
      .toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Typography color="white" p={4}>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error" p={4}>{error}</Typography>;
  }

  return (
    <Box sx={{ bgcolor: "#121212", minHeight: "100vh", p: 4 }}>
      {/* กล่อง Search + Button */}
      <Box
        display="flex"
        justifyContent="flex-end"
        gap={2}
        mb={4}
        sx={{
          width: "96%",
          margin: "auto", 
        }}
      >
        <SearchBox value={search} handleSearch={setSearch} />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/add")}
          sx={{
            height: "56px",
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "#aaa" },
          }}
        >
          Add new user
        </Button>
      </Box>
      <UserList users={filteredUsers} />
    </Box>
  );
}


export default UserListPage;
