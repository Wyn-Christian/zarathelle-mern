import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

function CustomersCreate() {
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
            <Grid xs={12}>
              <TextField label="Phone Number" name="phone" fullWidth />
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
