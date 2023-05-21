import {
  Box,
  Button,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function SignUp() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography textAlign="center" sx={{ pt: 10 }} variant="h3">
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
          <Grid xs={12}>
            <TextField label="User Name" fullWidth />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField label="First Name" fullWidth />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField label="Last Name" fullWidth />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              label="Email"
              fullWidth
              helperText="We'll never share your email to anyone"
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              label="Phone Number"
              fullWidth
              helperText="We'll never share your phone number to anyone"
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField label="Password" fullWidth />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField label="Re-enter Password" fullWidth />
          </Grid>
          <Grid xs={12}>
            <TextField
              label="Delivery Address"
              multiline
              fullWidth
              rows={3}
            />
          </Grid>
          <Grid xs={12}>
            <Button
              variant="contained"
              sx={{ width: { xs: "100%", sm: 200 } }}
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
