import { Typography, Paper, Grid } from "@mui/material";
import type { User } from "../types/User";
import { Box } from "@mui/system";
interface Props {
  user: User;
}

const UserProfile = ({ user }: Props) => {
  const fields = [
    { label: "Username", value: user.username },
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    {
      label: "Address",
      value: `${user.address?.street || "N/A"}, ${user.address?.suite || "N/A"}, ${user.address?.city || "N/A"}, ${user.address?.zipcode || "N/A"}`,
    },
    { label: "Phone", value: user.phone },
    { label: "Website", value: user.website },
    { label: "Company", value: user.company?.name },
  ];

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
      <Grid >
        <Typography variant="h5" mb={3} textAlign="center">
          User Profile
        </Typography>
      </Grid>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" rowGap={2}>
        {fields.map(({ label, value }, idx) => (
          <Typography
            key={idx}
            width={["Username", "Address", "Company"].includes(label) ? "100%" : "48%"}
          >
            {label}: {value || "N/A"}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default UserProfile;
