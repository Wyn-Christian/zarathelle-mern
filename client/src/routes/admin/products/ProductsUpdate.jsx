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

function ProductsUpdate() {
  const [file, setFile] = useState(null);

  const handleChange = (newFile) => {
    setFile(newFile);
  };
  return (
    <Box>
      <Typography variant="h4">Update Product</Typography>
      <Box>
        <Typography variant="overline">Product ID: </Typography>
        <Chip label="1234132413413241234" size="small" />
      </Box>

      <Box component="form" sx={{ mb: 5 }}>
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                label="Name"
                name="name"
                defaultValue="Sample Product Name"
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <MuiFileInput
                value={file}
                onChange={handleChange}
                placeholder="product.jpg"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Stocks"
                name="stocks"
                type="number"
                defaultValue="3"
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Status"
                name="status"
                defaultValue="in stocks"
                disabled
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Collection"
                name="collection_id"
                defaultValue="in stocks"
                disabled
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Category"
                name="category"
                defaultValue="ready made"
                disabled
                fullWidth
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Description"
                name="description"
                defaultValue="Sample Product Description"
                fullWidth
              />
            </Grid>

            <Grid xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: { xs: "100%", md: 200 } }}
              >
                Update Product
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default ProductsUpdate;
