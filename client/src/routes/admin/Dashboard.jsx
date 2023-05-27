import { Box, Paper, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CategoryIcon from "@mui/icons-material/Category";
import PixIcon from "@mui/icons-material/Pix";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useGetCountsListQuery } from "../../features/apiSlice";
import LoadingProgress from "../../components/LoadingProgress";
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
  const {
    data: count_list = {},
    isSuccess,
    isLoading,
  } = useGetCountsListQuery();

  let content;
  if (isLoading) {
    content = <LoadingProgress />;
  } else if (isSuccess) {
    content = (
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <DataSummary
          title="Customers"
          num={count_list.users}
          Icon={PermIdentityIcon}
        />
        <DataSummary
          title="Collections"
          num={count_list.collections}
          Icon={CategoryIcon}
        />
        <DataSummary
          title="Products"
          num={count_list.products}
          Icon={PixIcon}
        />
        <DataSummary
          title="Pending Orders"
          num={count_list.pending_orders}
          Icon={LocalShippingIcon}
        />
      </Grid>
    );
  }

  return (
    <Box>
      <Typography variant="h4">Dashboard</Typography>
      {content}
    </Box>
  );
}

export default Dashboard;
