import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/usersSlice";
import {
  useCheckoutOrderMutation,
  useGetCartByUserQuery,
  useRemoveToCartMutation,
  useUpdateCartMutation,
} from "../../features/apiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { api_base_url } from "../../app/base_url";
import { PHPPrice } from "../../app/priceFormatter";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const CartItem = ({ i, id, quantity, image_url, product }) => {
  const [updateCart] = useUpdateCartMutation();
  const [removeToCart] = useRemoveToCartMutation();

  const increaseQuantity = async () => {
    if (quantity + 1 < product.stocks) {
      let data = { id, data: { quantity: quantity + 1 } };
      await updateCart(data).unwrap();
    }
  };
  const decreaseQuantity = async () => {
    if (quantity - 1 !== 0) {
      let data = { id, data: { quantity: quantity - 1 } };
      await updateCart(data).unwrap();
    }
  };

  const deleteCart = async () => {
    await removeToCart(id).then((res) => {
      enqueueSnackbar("Cart Item Deleted", { variant: "success" });
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mb: { xs: 3, md: 0 },
        }}
      >
        <Typography variant="h4" sx={{ alignSelf: "center", mr: 3 }}>
          {i + 1}
        </Typography>
        <Paper>
          <CardMedia
            sx={{
              width: { xs: 150, md: 100 },
              height: { xs: 150, md: 100 },
            }}
            image={`${api_base_url}${product.image_url}`}
          />
        </Paper>
        <Box
          sx={{
            ml: 3,
            display: "flex",
            flexDirection: "column",
            width: { md: 400 },
          }}
        >
          <Box sx={{ maxWidth: { xs: 350, md: 500 } }}>
            <Typography fontWeight="bold">{product.name}</Typography>
          </Box>
          <Box>
            <Typography variant="caption">
              {product.category.toUpperCase()}
            </Typography>
          </Box>
          <Box>
            <Typography>{PHPPrice.format(product.price)}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ alignSelf: "center", ml: { md: 3 } }}>
        <ButtonGroup variant="contained">
          <Button onClick={decreaseQuantity}>
            <RemoveIcon />
          </Button>
          <Typography sx={{ m: 1.3 }}>{quantity}</Typography>
          <Button onClick={increaseQuantity}>
            <AddIcon />
          </Button>
          <Button onClick={deleteCart}>
            <DeleteIcon sx={{ color: "red" }} />
          </Button>
        </ButtonGroup>
      </Box>
      {product.category === "customizable" ? (
        <Box
          sx={{ alignSelf: "center", ml: { md: 3 }, mt: { xs: 3, md: 0 } }}
        >
          <Paper>
            <CardMedia
              sx={{
                width: { xs: 125, md: 90 },
                height: { xs: 125, md: 90 },
              }}
              image={`${api_base_url}${image_url}`}
            />
          </Paper>
        </Box>
      ) : (
        <Box sx={{ ml: { md: 14 } }} />
      )}
    </Box>
  );
};

function CartItems() {
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const {
    data: cart_items = [],
    isLoading,
    isSuccess,
  } = useGetCartByUserQuery(user.id);

  const [checkoutOrder] = useCheckoutOrderMutation();

  const checkOutClicked = async () => {
    const data = { user: user.id };
    data.items = cart_items.map((item) => {
      return { ...item, price: item.product.price };
    });
    data.total_quantity = cart_items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    data.total_price = cart_items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    console.log({ data });

    await checkoutOrder(data)
      .then((res) => {
        console.log("Create Order successfully", res);
        navigate("/user/orders");
      })
      .catch((err) => console.log(err));
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
        <Typography variant="h2" textAlign="center" sx={{ mt: 3 }}>
          Your Shopping Cart
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack spacing={6}>
            {cart_items.map((item, i) => (
              <CartItem key={item.id} {...item} i={i} />
            ))}
          </Stack>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box>
            <Typography variant="h3" textAlign="center" sx={{ mt: 3 }}>
              TOTAL
            </Typography>
            <Typography variant="h4" textAlign="center" sx={{ mt: 3 }}>
              {PHPPrice.format(
                cart_items.reduce(
                  (total, item) =>
                    total + item.product.price * item.quantity,
                  0
                )
              )}
            </Typography>
            <Typography variant="body1" textAlign="center">
              Free Shipping
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 3, width: 150 }}
            size="large"
            onClick={checkOutClicked}
            disabled={cart_items.length === 0}
          >
            CHECKOUT
          </Button>
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
      <Container sx={{ minHeight: "20vh" }}>{content}</Container>
      <Footer />
    </Box>
  );
}

export default CartItems;
