import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer";

function Product() {
  return (
    <Box>
      <Box
        sx={{
          background: `url("/images/banner.jpg") center center / cover no-repeat`,
          height: "50vh",
          position: "relative",
          display: "flex",
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

      <Container sx={{ minHeight: "20vh " }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <Card>
            <CardMedia
              sx={{ height: 400, width: 400, m: 1.1 }}
              image={`/images/sample/product.jpg`}
            />
          </Card>
          <Box
            sx={{
              ml: 4,
              mt: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography variant="h3">Product Title</Typography>
              <Typography variant="h6">Type: Product Type</Typography>
              <Typography variant="h6">Stocks: 100</Typography>
              <Typography variant="body2">Product Description</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Button variant="contained" sx={{ width: 200, mb: 2 }}>
                Add Custom Photo
              </Button>
              <Button variant="contained" sx={{ width: 200 }}>
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default Product;
