import { useSelector } from "react-redux";
import { userSelector } from "../../features/usersSlice";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import {
  useChangeStatusOrderMutation,
  useGetOrdersByUserQuery,
} from "../../features/apiSlice";
import { PHPPrice } from "../../app/priceFormatter";
import { useEffect } from "react";
import { api_base_url } from "../../app/base_url";
import { enqueueSnackbar } from "notistack";

const OrderItem = ({ product, quantity, price, image_url }) => (
  <Box sx={{ display: "flex", mb: 3 }}>
    <Paper>
      <CardMedia
        sx={{
          width: { xs: 125, md: 90 },
          height: { xs: 125, md: 90 },
        }}
        image={
          product?.category === "ready made"
            ? `${api_base_url}${product?.image_url}`
            : `${api_base_url}${image_url}`
        }
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
        <Typography fontWeight="bold" sx={{ width: { md: 375 } }}>
          {product?.name}
        </Typography>
        <Typography variant="caption">
          {product?.category.toUpperCase()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography>Qty: {quantity}</Typography>
        <Typography>Price: {PHPPrice.format(price)}</Typography>
      </Box>
    </Box>
  </Box>
);

const StatusInfo = ({ status }) => {
  let content;
  switch (status) {
    case "to process":
      content = <Chip label="To Process" color="warning" />;
      break;
    case "on its way":
      content = <Chip label="On Its Way" color="info" />;
      break;
    case "delivered":
      content = <Chip label="Delivered" color="success" />;
      break;
    case "cancelled":
      content = <Chip label="Cancelled" color="error" />;
      break;
  }
  return content;
};

const OrderItems = ({
  items = [],
  id,
  status,
  total_quantity,
  total_price,
}) => {
  const theme = useTheme();
  const [changeStatusOrder] = useChangeStatusOrderMutation();

  const handleCancelClick = async () => {
    await changeStatusOrder({ id, data: { status: "cancelled" } })
      .unwrap()
      .then((res) =>
        enqueueSnackbar("Order Cancelled Successfully!", {
          variant: "success",
        })
      );
  };

  return (
    <Paper
      elevation={3}
      sx={{ mb: 3, width: { xs: "100%", sm: 600, md: 800, lg: 1000 } }}
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
          <StatusInfo status={status} />
        </Box>
        {status === "to process" && (
          <Button
            sx={{ color: theme.palette.secondary.main }}
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        )}
      </Box>
      <Divider />
      <Box sx={{ p: "10px 20px" }}>
        {items.map((item) => (
          <OrderItem key={item.id} {...item} />
        ))}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography textAlign="end">
          Total({total_quantity} items): {PHPPrice.format(total_price)}
        </Typography>
      </Box>
    </Paper>
  );
};

function Orders() {
  const user = useSelector(userSelector);
  const {
    data: orders = [],
    isSuccess,
    isLoading,
  } = useGetOrdersByUserQuery(user.id);

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
        <Typography variant="h2" textAlign="center" sx={{ m: 4 }}>
          Orders
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {orders.map((order) => (
            <OrderItems key={order.id} {...order} />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          background: `url("/images/slider2.png") center center / cover no-repeat`,
          height: "60vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "block",
            width: "100%",
            backgroundColor: "rgba(7,6,29,0.14)",
            top: 0,
            left: 0,
            zIndex: 1,
            height: "100%",
            position: "absolute",
          },
        }}
      />
      <Container sx={{ minHeight: "10vh" }}>{content}</Container>
      <Footer />
    </Box>
  );
}

export default Orders;
