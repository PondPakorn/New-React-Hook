import {
  Box,
  Typography,
  Paper,
  IconButton,
  Stack,
  Grid,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import type { User } from "../types/User";
import { useNavigate } from "react-router-dom";


interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#121212", minHeight: "100vh", color: "#fff", p: 4 }}>
      

      <Stack spacing={2}>
        {users.map((user) => (
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
