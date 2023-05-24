import { useFormik } from "formik";
import {
  Box,
  Button,
  FormLabel,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import Grid from "@mui/material/Unstable_Grid2";
import { useSignUpUserMutation } from "../../features/apiSlice";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

function SignUp() {
  const navigate = useNavigate();
  const [signUpUser, { isSuccess }] = useSignUpUserMutation();

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
    if (formik.values.password === formik.values.repassword) {
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
          navigate(`/login`);
        })
        .catch((err) => console.error(err));
    } else {
      enqueueSnackbar("Password don't match!", { variant: "error" });
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={10}>
      <Toolbar />
      <Typography textAlign="center" sx={{ pt: 10, mb: 3 }} variant="h3">
        Create an account
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", md: 800 },
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
        component="form"
      >
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <TextField
              label="User Name"
              name="username"
              autoComplete="off"
              value={formik.values.username}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} md={6}>
            <MuiFileInput
              value={formik.values.image}
              onChange={(e) => formik.setFieldValue("image", e)}
              placeholder="Profile Image"
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              label="First Name"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              helperText="We'll never share your email to anyone"
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              fullWidth
              helperText="We'll never share your phone number to anyone"
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              autoComplete="off"
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              label="Re-enter Password"
              type="password"
              name="repassword"
              value={formik.values.repassword}
              onChange={formik.handleChange}
              autoComplete="off"
              fullWidth
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              label="Delivery Address"
              multiline
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              fullWidth
              rows={3}
            />
          </Grid>
          <Grid xs={12}>
            <Button
              variant="contained"
              sx={{ width: { xs: "100%", sm: 200 } }}
              onClick={onSubmit}
            >
              Create an Account
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default SignUp;
