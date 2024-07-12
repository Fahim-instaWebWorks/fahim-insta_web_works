import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const Home = ({ documentList, handleMerge }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      selectedDocument: null,
      fileType: '',
      downloadToComputer: true,
      saveToRecord: false,
      currentRecord: null
    }
  });

  const onSubmit = data => {
    console.log(data);
    handleMerge(data);
  };

  const selectedDocument = watch("selectedDocument");
  const fileType = watch("fileType");

  return (
    <Box>
      <Typography variant="h5" textAlign={"left"} pl={2}>
        Select a Template to Merge
      </Typography>
      <Box display={"flex"} p={2} justifyContent={"space-between"}>
        <Controller
          name="selectedDocument"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              size="small"
              disablePortal
              id="combo-box-demo"
              options={documentList.map(doc => doc.document_name)}
              sx={{ width: 480 }}
              renderInput={(params) => <TextField {...params} label="Deal Proposal" />}
              onChange={(event, value) => field.onChange(value)}
            />
          )}
        />

        <Controller
          name="fileType"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              size="small"
              disablePortal
              id="combo-box-demo"
              options={['Pdf', "Docx"]}
              sx={{ width: 180 }}
              renderInput={(params) => <TextField {...params} label=".Pdf" />}
              onChange={(event, value) => field.onChange(value)}
            />
          )}
        />
      </Box>
      <Typography variant="h5" textAlign={"left"} pl={2}>
        Select Outputs
      </Typography>
      <Box p={2} justifyContent={"space-between"}>
        <FormGroup>
          <Controller
            name="downloadToComputer"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Download to Computer"
              />
            )}
          />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Controller
              name="saveToRecord"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Save to Record"
                  sx={{ width: "45%" }}
                />
              )}
            />
            <Controller
              name="currentRecord"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  sx={{ width: "45%" }}
                  renderInput={(params) => <TextField {...params} label="Current record" />}
                  onChange={(event, value) => field.onChange(value)}
                />
              )}
            />
          </Box>
        </FormGroup>
      </Box>

      <Box display={'flex'} justifyContent={"space-around"}>
        <Button variant="contained" sx={{width:'48%'}} onClick={handleSubmit(onSubmit)}>Merge</Button>
        <Button variant="contained" color="error" sx={{width:'48%'}}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default Home;

const top100Films = [
  { label: "Current Record", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
