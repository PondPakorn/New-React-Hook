import { TextField } from "@mui/material";

interface Props {
  value: string;
  handleSearch: (value: string) => void;
}

const SearchBox = ({ value, handleSearch }: Props) => {
  return (
      <TextField
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Username, Name, Email"
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: "350px",
          input: { color: "#fff" },
          fieldset: { borderColor: "#444" },
          "& .MuiOutlinedInput-root:hover fieldset": {
            borderColor: "#888",
          },
        }}
        InputLabelProps={{ style: { color: "#999" } }}
      />
  );
};

export default SearchBox;
