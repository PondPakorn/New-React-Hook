import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();


  return (
    <Button
      onClick={() => navigate("/")}
      startIcon={<ArrowBackIcon />}
      sx={{ color: "white", mb: 3 }}
    >
      Back
    </Button>
  );
};

export default BackButton;
