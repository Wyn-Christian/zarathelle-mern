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

function ProductsCreate() {
  const [collection, setCollection] = useState("");

  const [file, setFile] = useState(null);

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  return (
    <Box>
      <Typography variant="h4">Create Product</Typography>
      <Box component="form" sx={{ mb: 5 }}>
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField label="Product Name" name="name" fullWidth />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                type="number"
                label="Stocks"
                name="stocks"
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="collectin-id">Collection</InputLabel>
                <Select
                  fullWidth
                  labelId="collectin-id"
                  value={collection}
                  label="Collection"
                  name="collection_id"
                  onChange={(e) => setCollection(e.target.value)}
                >
                  <MenuItem value={"123"}>Sample Collection</MenuItem>
                  <MenuItem value={"456"}>Sample Collection 1</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Category"
                name="category"
                fullWidth
                disabled
              />
            </Grid>
            <Grid xs={12} md={6}>
              <MuiFileInput
                value={file}
                onChange={handleChange}
                placeholder="Insert an Image"
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
                sx={{ width: { xs: "100%", md: 160 } }}
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default ProductsCreate;
