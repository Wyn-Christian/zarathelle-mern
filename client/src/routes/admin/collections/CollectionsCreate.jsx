import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

function CollectionsCreate() {
  const [category, setCategory] = useState("ready made");

  const [file, setFile] = useState(null);

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  return (
    <Box>
      <Typography variant="h4">Create Collection</Typography>
      <Box component="form" sx={{ mb: 5 }}>
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField label="Collection Title" name="title" fullWidth />
            </Grid>
            <Grid xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="category-id">Category</InputLabel>
                <Select
                  fullWidth
                  labelId="category-id"
                  value={category}
                  label="Category"
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={"ready made"}>Ready Made</MenuItem>
                  <MenuItem value={"customizable"}>Customizable</MenuItem>
                </Select>
              </FormControl>
            </Grid>{" "}
            <Grid xs={12} md={6}>
              <MuiFileInput
                value={file}
                onChange={handleChange}
                placeholder="Insert an image"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Description"
                rows={3}
                name="description"
                fullWidth
                multiline
              />
            </Grid>
            <Grid xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: { xs: "100%", md: 200 } }}
              >
                Add Collection
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default CollectionsCreate;
