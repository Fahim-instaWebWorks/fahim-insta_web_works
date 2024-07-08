import { Autocomplete, Box, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Box>
      <Typography variant="h5" textAlign={"left"} pl={2}>
        Select a Template to Merge
      </Typography>
      <Box display={"flex"} p={2} justifyContent={"space-between"}>
        <Autocomplete
          size="small"
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 480 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />

        <Autocomplete
          size="small"
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 180 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </Box>
      <Typography variant="h5" textAlign={"left"} pl={2}>
        Select Outputs
      </Typography>
      <Box p={2} justifyContent={"space-between"}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Download to Computer"
          />
          <FormControlLabel required control={<Checkbox />} label="Save to Record" />
        </FormGroup>
      </Box>
    </Box>
  );
};

export default Home;

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
