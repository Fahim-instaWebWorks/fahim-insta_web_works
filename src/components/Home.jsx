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
import React, { useState } from "react";

const Home = ({documentList,handleMerge}) => {
  const [selectedDocumment,setSelectedDocument] = useState(null)
  const [fileType,setFileType] = useState('')

  const handleChange = (event, value) => {
    // Find the selected document object based on the document name
    const document = documentList.find(doc => doc.document_name === value);
    setSelectedDocument(document);
    console.log(document); // You can use the selected document object as needed
  };

  const handleSelectFileType = (event,value) =>{
    setFileType(value)
  }
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
          options={documentList.map(doc => doc.document_name)}
          sx={{ width: 480 }}
          renderInput={(params) => <TextField {...params} label="Deal Proposal" />}
          onChange={handleChange}
        />

        <Autocomplete
          size="small"
          disablePortal
          id="combo-box-demo"
          options={['Pdf',"Docx"]}
          sx={{ width: 180 }}
          renderInput={(params) => <TextField {...params} label=".Pdf" />}
          onChange={handleSelectFileType}
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
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControlLabel
              control={<Checkbox />}
              label="Save to Record"
              sx={{ width: "45%" }}
            />
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: "45%" }}
              renderInput={(params) => <TextField {...params} label="Current record" />}
            />
          </Box>
        </FormGroup>
      </Box>

      <Box display={'flex'} justifyContent={"space-around"}>
        <Button variant="contained" sx={{width:'48%'}} onClick={handleMerge}>Merge</Button>
        <Button variant="contained" color="error" sx={{width:'48%'}}>Cencel</Button>
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
