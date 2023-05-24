import { useEffect, useState } from "react";
import { useFormik } from "formik";

// MUI Components
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
import {
  useCreateProductMutation,
  useGetCollectionsQuery,
} from "../../../features/apiSlice";
import { useNavigate } from "react-router-dom";

function ProductsCreate() {
  const navigate = useNavigate();
  const { data: collections = [] } = useGetCollectionsQuery();
  const [createProduct, { data }] = useCreateProductMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      collection_id: "",
      category: "",
      price: 100,
      stocks: 1,
      image: null,
    },
  });

  useEffect(() => {
    if (collections.length > 0 && formik.values.collection_id) {
      let selectedCol = collections.find(
        (col) => col.id == formik.values.collection_id
      );
      formik.setFieldValue("category", selectedCol.category);
    }
  }, [formik.values.collection_id]);

  const onSubmit = async () => {
    const new_product = new FormData();
    new_product.append("name", formik.values.name);
    new_product.append("description", formik.values.description);
    new_product.append("collection_id", formik.values.collection_id);
    new_product.append("category", formik.values.category);
    new_product.append("price", formik.values.price);
    new_product.append("stocks", formik.values.stocks);
    new_product.append("image", formik.values.image);

    await createProduct(new_product)
      .unwrap()
      .then((res) => {
        console.log("Create Product Successfully", res);
        navigate(`/admin/products/${res.id}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box>
      <Typography variant="h4">Create Product</Typography>
      <Box component="form" sx={{ mb: 5 }}>
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                label="Product Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                type="number"
                label="Price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                fullWidth
              />
            </Grid>

            <Grid xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="collectin-id">Collection</InputLabel>
                <Select
                  fullWidth
                  labelId="collectin-id"
                  label="Collection"
                  name="collection_id"
                  value={formik.values.collection_id}
                  onChange={formik.handleChange}
                >
                  {collections.map((collection) => (
                    <MenuItem key={collection.id} value={collection.id}>
                      {collection.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                type="number"
                label="Stocks"
                name="stocks"
                value={formik.values.stocks}
                onChange={formik.handleChange}
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <MuiFileInput
                value={formik.values.image}
                onChange={(e) => formik.setFieldValue("image", e)}
                placeholder="Insert an Image"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                rows={3}
                fullWidth
                multiline
              />
            </Grid>
            <Grid xs={12}>
              <Button
                variant="contained"
                sx={{ width: { xs: "100%", md: 160 } }}
                onClick={onSubmit}
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
