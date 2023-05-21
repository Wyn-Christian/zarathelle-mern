import { Box, Paper, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CategoryIcon from "@mui/icons-material/Category";
import PixIcon from "@mui/icons-material/Pix";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
const DataSummary = ({ title, num, Icon }) => {
  const theme = useTheme();
  return (
    <Grid xs={12} md={6} lg={3}>
      <Paper
        elevation={3}
        sx={{ p: 3, display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <Icon
            sx={{ fontSize: 50, color: theme.palette.secondary.main }}
          />
        </Box>
        <Box textAlign="end">
          <Typography variant="h5">{num}</Typography>
          <Typography variant="body1">{title}</Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4">Dashboard</Typography>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <DataSummary title="Customers" num={10} Icon={PermIdentityIcon} />
        <DataSummary title="Collections" num={4} Icon={CategoryIcon} />
        <DataSummary title="Products" num={12} Icon={PixIcon} />
        <DataSummary
          title="Pending Orders"
          num={51}
          Icon={LocalShippingIcon}
        />
      </Grid>
    </Box>
  );
}

export default Dashboard;
