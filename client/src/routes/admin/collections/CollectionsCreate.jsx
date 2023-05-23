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

import { useCreateCollectionMutation } from "../../../features/apiSlice";

function CollectionsCreate() {
  const [createCollection, { data, isSuccess }] =
    useCreateCollectionMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "ready made",
      image: null,
    },
  });

  const onSubmit = async () => {
    const new_collection = new FormData();
    new_collection.append("title", formik.values.title);
    new_collection.append("description", formik.values.description);
    new_collection.append("category", formik.values.category);
    new_collection.append("image", formik.values.image);

    await createCollection(new_collection)
      .unwrap()
      .then((res) => console.log("Create Collection Successfully", res))
      .catch((err) => console.error(err));

    formik.resetForm();
  };

  return (
    <Box>
      <Typography variant="h4">Create Collection</Typography>
      <Box component="form" sx={{ mb: 5 }}>
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                label="Collection Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="category-id">Category</InputLabel>
                <Select
                  fullWidth
                  labelId="category-id"
                  value={formik.values.category}
                  label="Category"
                  name="category"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={"ready made"}>Ready Made</MenuItem>
                  <MenuItem value={"customizable"}>Customizable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
              <MuiFileInput
                name="image"
                value={formik.values.image}
                onChange={(e) => formik.setFieldValue("image", e)}
                placeholder="Insert an image"
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
                sx={{ width: { xs: "100%", md: 200 } }}
                onClick={onSubmit}
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
