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
          Product Title Product Title Product Title Product Title Product
          Title Product Title
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
          <Chip color="primary" label="To Process" />
        </Box>
        <Button sx={{ color: theme.palette.secondary.main }}>
          Cancel
        </Button>
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

function Orders() {
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
          <OrderItems />
          <OrderItems />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default Orders;
