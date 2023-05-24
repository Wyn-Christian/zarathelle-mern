import Grid from "@mui/material/Unstable_Grid2";
import { MuiFileInput } from "mui-file-input";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSignUpUserMutation } from "../../../features/apiSlice";
import { useFormik } from "formik";

function CustomersCreate() {
  const navigate = useNavigate();
  const [signUpUser] = useSignUpUserMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      repassword: "",
      image: null,
    },
  });

  const onSubmit = async () => {
    const new_user = new FormData();
    new_user.append("username", formik.values.username);
    new_user.append("first_name", formik.values.first_name);
    new_user.append("last_name", formik.values.last_name);
    new_user.append("address", formik.values.address);
    new_user.append("phone", formik.values.phone);
    new_user.append("email", formik.values.email);
    new_user.append("password", formik.values.password);
    new_user.append("image", formik.values.image);

    await signUpUser(new_user)
      .unwrap()
      .then((res) => {
        console.log("Create User Successfully", res);
        navigate(`/admin/customers`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box>
      <Typography variant="h4">Create Customer</Typography>

      <Box component="form" sx={{ mb: 5 }}>
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField label="User Name" name="username" fullWidth />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField label="Email" name="email" fullWidth />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField label="First Name" name="first_name" fullWidth />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField label="Last Name" name="last_name" fullWidth />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                type="password"
                label="Password"
                name="password"
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                type="password"
                label="Re-enter Password"
                name="re-password"
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField label="Phone Number" name="phone" fullWidth />
            </Grid>
            <Grid xs={12} md={6}>
              <MuiFileInput
                value={formik.values.image}
                onChange={(e) => formik.setFieldValue("image", e)}
                placeholder="Profile Image"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Address"
                rows={3}
                name="address"
                fullWidth
                multiline
              />
            </Grid>
            <Grid xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: { xs: "100%", md: 160 } }}
                onClick={onSubmit}
              >
                Add Customer
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default CustomersCreate;
