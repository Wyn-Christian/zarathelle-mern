import {
  Box,
  Button,
  CardMedia,
  Chip,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Link, useParams } from "react-router-dom";

const Title = ({ title }) => (
  <Box>
    <Box m={1}>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
    </Box>
    <Divider />
  </Box>
);
const Info = ({ title, value }) => (
  <Box>
    <Box m={1}>
      <Typography>{title}</Typography>
      <Typography variant="body2" color="gray">
        {value}
      </Typography>
    </Box>
    <Divider />
  </Box>
);

const OrderItem = () => (
  <Box sx={{ display: "flex", mb: 3 }}>
    <Paper>
      <CardMedia
        sx={{
          width: { xs: 125, md: 90 },
          height: { xs: 125, md: 90 },
        }}
        image="/images/sample/product.jpg"
      />
    </Paper>
    <Box
      sx={{
        ml: 3,
        display: "flex",
        flexGrow: 1,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 2 }}>
        <Typography fontWeight="bold" sx={{ maxWidth: 375 }}>
          Product Title Product Title Product Title Product Title Product Title
          Product Title
        </Typography>
        <Typography>Type</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography>Qty: 3</Typography>
        <Typography>Price: 300.00</Typography>
      </Box>
    </Box>
  </Box>
);

const OrderItems = () => {
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{ mb: 3, width: { xs: "100%", md: 800, lg: 1000 } }}
    >
      <Box
        sx={{
          p: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Chip color="primary" label="To Process" />
        </Box>
        <Button sx={{ color: theme.palette.secondary.main }}>Cancel</Button>
      </Box>
      <Divider />
      <Box sx={{ p: "10px 20px" }}>
        <OrderItem />
        <OrderItem />
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography textAlign="end">Total(3 items): 1,200.00</Typography>
      </Box>
    </Paper>
  );
};

function OrdersDetail() {
  const { id } = useParams();
  return (
    <Box>
      <Typography variant="h4">Order Details</Typography>

      <Box>
        <Typography variant="overline">Order ID: </Typography>
        <Chip label="1234132413413241234" size="small" />
      </Box>

      <Grid container spacing={4}>
        <Grid xs={12} md={6}>
          <Paper elevation={3}>
            <Title title="User Details" />
            <Info title="User Name" value="User Name Sample" />
            <Info title="Full Name" value="User Full Name Sample" />
            <Info title="Email" value="sample@gmail.com" />
            <Info title="Phone" value="09214765154 gcash huehue" />
            <Info title="Address" value="Sa puso mo" />
          </Paper>
        </Grid>
        <Grid xs={12} md={6}>
          <Paper elevation={3}>
            <Title title="Order Details" />
            <Info
              title="Date Created"
              value={new Date(Date.now()).toISOString()}
            />
            <Info title="Total Price" value={123.23} />
            <Info title="Total Quantity" value={12} />
          </Paper>
        </Grid>
        <Grid xs={12} md={6}>
          <Paper elevation={3}>
            <Title title="Status" />
            <Info title="Current Status" value="To Process" />
          </Paper>
        </Grid>
        <Grid xs={12}>
          <OrderItems />
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrdersDetail;
