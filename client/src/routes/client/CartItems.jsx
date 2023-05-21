import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ title, quantity, type, image }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },

      mb: 3,
    }}
  >
    <Box
      sx={{
        display: "flex",
        mb: { xs: 3, md: 0 },
      }}
    >
      <Typography variant="h4" sx={{ alignSelf: "center", mr: 3 }}>
        1
      </Typography>
      <Paper>
        <CardMedia
          sx={{
            width: { xs: 150, md: 100 },
            height: { xs: 150, md: 100 },
          }}
          image="/images/sample/product.jpg"
        />
      </Paper>
      <Box
        sx={{
          ml: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ maxWidth: { xs: 350, md: 500 } }}>
          <Typography fontWeight="bold">
            Product Title Product Title Product Title Product Title
          </Typography>
        </Box>
        <Box>
          <Typography>Type</Typography>
        </Box>
        <Box>
          <Typography>100.00</Typography>
        </Box>
      </Box>
    </Box>

    <Box sx={{ alignSelf: "center", ml: { md: 3 } }}>
      <ButtonGroup variant="contained">
        <Button>
          <RemoveIcon />
        </Button>
        <Typography sx={{ m: 1.3 }}>1</Typography>
        <Button>
          <AddIcon />
        </Button>
        <Button>
          <DeleteIcon sx={{ color: "red" }} />
        </Button>
      </ButtonGroup>
    </Box>
    <Box sx={{ alignSelf: "center", ml: { md: 3 }, mt: { xs: 3, md: 0 } }}>
      <Paper>
        <CardMedia
          sx={{
            width: { xs: 125, md: 90 },
            height: { xs: 125, md: 90 },
          }}
          image="/images/sample/product.jpg"
        />
      </Paper>
    </Box>
  </Box>
);

function CartItems() {
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
      <Container sx={{ minHeight: "10vh" }}>
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
          <CartItem />
          <CartItem />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box>
            <Typography variant="h3" textAlign="center" sx={{ mt: 3 }}>
              TOTAL
            </Typography>
            <Typography variant="h4" textAlign="center" sx={{ mt: 3 }}>
              ₱1000.00
            </Typography>
            <Typography variant="body1" textAlign="center">
              Free Shipping
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 3, width: 150 }}
            size="large"
          >
            CHECKOUT
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default CartItems;
