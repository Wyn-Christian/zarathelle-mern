import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Chip,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function CustomersUpdate() {
  return (
    <Box>
      <Typography variant="h4">Update Customer</Typography>
      <Box>
        <Typography variant="overline">User ID:</Typography>
        <Chip label="12312312312" size="small" />
      </Box>
      <Box component="form" sx={{ mb: 5 }}>
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                defaultValue="Sample Username"
                label="User Name"
                name="username"
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                defaultValue="Sample Email"
                label="Email"
                name="email"
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                defaultValue="Sample first name"
                label="First Name"
                name="first_name"
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                defaultValue="Sample last name"
                label="Last Name"
                name="last_name"
                fullWidth
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                defaultValue="Sample Phone number"
                label="Phone Number"
                name="phone"
                fullWidth
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                defaultValue="Sample Address"
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

export default CustomersUpdate;
