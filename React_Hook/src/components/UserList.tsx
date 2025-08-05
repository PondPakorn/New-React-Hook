// UserList.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Stack,
  Grid,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import type { User } from "../types/User";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const filtered = users.filter((user) =>
    `${user.name}${user.username}${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  return (
    <Box sx={{ bgcolor: "#121212", minHeight: "100vh", color: "#fff", p: 4 }}>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        mb={4}
      >
        <Typography variant="h4" mb={4} fontWeight="bold">
          UserList
        </Typography>

        <SearchBox value={search} onChange={setSearch} />

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/add")}
          sx={{ color: "white", borderColor: "white", "&:hover": { borderColor: "#aaa" } }}
        >
          Add new User
        </Button>
      </Stack>

      <Stack spacing={2}>
        {filtered.map((user) => (
          <Paper
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
            sx={{
              bgcolor: "#1e1e1e",
              border: "1px solid #444",
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": { bgcolor: "#2a2a2a" },
            }}
          >
            <Box width="100%" height={70} display="flex">
              <Grid container spacing={4} alignItems="center" width="120%">
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="white">
                    Username: <strong>{user.username}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="white">
                    Name: <strong>{user.name}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="white">
                    Email: <strong>{user.email}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <IconButton>
              <ArrowForwardIosIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default UserList;