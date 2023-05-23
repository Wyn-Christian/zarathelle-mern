import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../features/apiSlice";
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
import Grid from "@mui/material/Unstable_Grid2";

function CustomersUpdate() {
  const { id } = useParams();
  const { data: user = {}, isLoading, isSuccess } = useGetUserQuery(id);
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: user?.username,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      image: null,
    },
  });

  useEffect(() => {
    formik.setValues({
      username: user?.username,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      image: null,
    });
  }, [user]);

  const onSubmit = async () => {
    if (
      formik.values.username !== user.username ||
      formik.values.first_name !== user.first_name ||
      formik.values.last_name !== user.last_name ||
      formik.values.email !== user.email ||
      formik.values.phone !== user.phone ||
      formik.values.address !== user.address ||
      formik.values.image !== null
    ) {
      const user = new FormData();
      user.append("username", formik.values.username);
      user.append("first_name", formik.values.first_name);
      user.append("last_name", formik.values.last_name);
      user.append("email", formik.values.email);
      user.append("phone", formik.values.phone);
      user.append("address", formik.values.address);

      if (formik.values.image !== null)
        user.append("image", formik.values.image);

      const data = { id, user };
      console.log({ data });
      await updateUser({ id, user })
        .unwrap()
        .then((res) => {
          console.log("Update User Successfully", res);

          navigate(`/admin/customers/${id}`);
        })
        .catch((err) => console.log("ERROR: ", err));
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
        <Typography variant="h4">Update Customer</Typography>
        <Box>
          <Typography variant="overline">User ID:</Typography>
          <Chip label={id} size="small" />
        </Box>
        <Box component="form" sx={{ mb: 5 }}>
          <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  label="User Name"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="First Name"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Last Name"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                <MuiFileInput
                  value={formik.values.image}
                  onChange={(e) => formik.setFieldValue("image", e)}
                  placeholder={user?.image.substring()}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="Address"
                  rows={3}
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
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
                  Update Customer
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

export default CustomersUpdate;
