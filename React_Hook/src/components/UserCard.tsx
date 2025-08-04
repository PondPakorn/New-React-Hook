// import { Paper, Box, Grid, Typography, IconButton } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useNavigate } from "react-router-dom";
// import type { User } from "../types/User";

// interface Props {
//   user: User;
// }

// const UserCard = ({ user }: Props) => {
//   const navigate = useNavigate();

//   return (
//     <Paper
//       onClick={() => navigate(`/user/${user.id}`)}
//       sx={{
//         bgcolor: "#1e1e1e",
//         border: "1px solid #444",
//         p: 2,
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         cursor: "pointer",
//         "&:hover": { bgcolor: "#2a2a2a" },
//       }}
//     >
//       <Box width="100%" height={70} display="flex">
//         <Grid container spacing={4} alignItems="center" width="120%">
//           <Grid item xs={12} sm={4}>
//             <Typography variant="body2" color="white">
//               Username: <strong>{user.username}</strong>
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Typography variant="body2" color="white">
//               Name: <strong>{user.name}</strong>
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Typography variant="body2" color="white">
//               Email: <strong>{user.email}</strong>
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//       <IconButton>
//         <ArrowForwardIosIcon fontSize="small" sx={{ color: "white" }} />
//       </IconButton>
//     </Paper>
//   );
// };

// export default UserCard;
