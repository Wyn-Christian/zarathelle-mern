import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

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
  useGetCollectionQuery,
  useUpdateCollectionMutation,
} from "../../../features/apiSlice";

function CollectionsUpdate() {
  const { id } = useParams();
  const {
    data: collection = {},
    isLoading,
    isSuccess,
  } = useGetCollectionQuery(id);
  const [updateCollection] = useUpdateCollectionMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: collection.title,
      description: collection.description,
      category: collection.category,
      image: null,
    },
  });

  useEffect(() => {
    formik.setValues({
      title: collection?.title,
      last_name: collection?.last_name,
      description: collection?.description,
      category: collection?.category,
      image: null,
    });
  }, [collection]);

  const onSubmit = async () => {
    if (
      formik.values.title !== collection.title ||
      formik.values.description !== collection.description ||
      formik.values.image !== null
    ) {
      const collection = new FormData();
      collection.append("title", formik.values.title);
      collection.append("description", formik.values.description);

      if (formik.values.image !== null)
        collection.append("image", formik.values.image);

      const data = { id, collection };
      await updateCollection(data).unwrap();

      navigate(`/admin/collections/${id}`);
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
        <Typography variant="h4">Update Collection</Typography>
        <Box>
          <Typography variant="overline">Collection ID: </Typography>
          <Chip label={id} size="small" />
        </Box>

        <Box component="form" sx={{ mb: 5 }}>
          <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  label="Title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <MuiFileInput
                  value={formik.values.image}
                  onChange={(e) => formik.setFieldValue("image", e)}
                  placeholder={collection?.image}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  fullWidth
                  rows={3}
                />
              </Grid>

              <Grid xs={12}>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "100%", md: 200 } }}
                  onClick={onSubmit}
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

  return <Box>{content}</Box>;
}

export default CollectionsUpdate;
