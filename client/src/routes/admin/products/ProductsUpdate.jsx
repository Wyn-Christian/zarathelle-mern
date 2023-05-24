import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Chip,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MuiFileInput } from "mui-file-input";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../features/apiSlice";
import { useFormik } from "formik";

function ProductsUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: product = {},
    isSuccess,
    isLoading,
  } = useGetProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();

  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description,
      category: product.category,
      stocks: product.stocks,
      price: product.price,

      collection_id: product.collection_id,
      image: null,
    },
  });

  useEffect(() => {
    formik.setValues({
      name: product?.name,
      description: product?.description,
      category: product?.category,
      price: product?.price,
      stocks: product?.stocks,
      collection_id: product?.collection_id,
      image: null,
    });
  }, [product]);

  const onSubmit = async () => {
    if (
      formik.values.name !== product.name ||
      formik.values.description !== product.description ||
      formik.values.stocks !== product.stocks ||
      formik.values.price !== product.price ||
      formik.values.image !== null
    ) {
      const product = new FormData();
      product.append("name", formik.values.name);
      product.append("description", formik.values.description);
      product.append("price", formik.values.price);
      product.append("stocks", formik.values.stocks);

      if (formik.values.image !== null)
        product.append("image", formik.values.image);

      const data = { id, product };

      await updateProduct(data).unwrap();

      navigate(`/admin/products/${id}`);
    }
  };

  let content;
  if (isLoading) {
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        <CircularProgress size={150} />
      </Box>
    );
  } else if (isSuccess) {
    content = (
      <Box>
        <Typography variant="h4">Update Product</Typography>
        <Box>
          <Typography variant="overline">Product ID: </Typography>
          <Chip label={id} size="small" />
        </Box>

        <Box component="form" sx={{ mb: 5 }}>
          <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <MuiFileInput
                  value={formik.values.image}
                  onChange={(e) => formik.setFieldValue("image", e)}
                  placeholder={product?.image}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Stocks"
                  name="stocks"
                  type="number"
                  value={formik.values.stocks}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Status"
                  name="status"
                  disabled
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Collection"
                  name="collection_id"
                  disabled
                  value={formik.values.collection_id?.title}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Category"
                  name="category"
                  disabled
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>

              <Grid xs={12}>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "100%", md: 200 } }}
                  onClick={onSubmit}
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

  return <Box>{content}</Box>;
}

export default ProductsUpdate;
