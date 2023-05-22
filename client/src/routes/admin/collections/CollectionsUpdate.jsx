import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Chip,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

function CollectionsUpdate() {
  const [file, setFile] = useState(null);

  const handleChange = (newFile) => {
    setFile(newFile);
  };
  return (
    <Box>
      <Typography variant="h4">Update Collection</Typography>
      <Box>
        <Typography variant="overline">Collection ID: </Typography>
        <Chip label="1234132413413241234" size="small" />
      </Box>

      <Box component="form" sx={{ mb: 5 }}>
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                defaultValue="Sample Title"
                label="Title"
                name="title"
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <MuiFileInput
                value={file}
                onChange={handleChange}
                placeholder="collection.jpg"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                defaultValue="Sample Collection Description"
                label="Description"
                name="description"
                fullWidth
              />
            </Grid>

            <Grid xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: { xs: "100%", md: 200 } }}
              >
                Update Collection
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default CollectionsUpdate;
