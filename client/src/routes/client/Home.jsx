import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useGetProductsQuery } from "../../features/apiSlice";
import LoadingProgress from "../../components/LoadingProgress";
import { api_base_url } from "../../app/base_url";
import { PHPPrice } from "../../app/priceFormatter";

const CollectionCard = ({ id, image_url, name, description, price }) => {
  const theme = useTheme();
  return (
    <Grid xs={12} sm={8} md={4}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          width: { xs: 260, sm: 270, md: 280, lg: 300 },
          m: "auto",
        }}
      >
        <Box>
          <CardMedia
            sx={{ height: 200 }}
            alt={name}
            image={`${api_base_url}${image_url}`}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </Box>
        <CardActions sx={{ ml: 4, mr: 5 }}>
          <Typography sx={{ flexGrow: 1 }} fontWeight="bold">
            {PHPPrice.format(price)}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            sx={{
              fontWeight: "bold",
              color: theme.palette.secondary.main,
              borderColor: theme.palette.secondary.main,
            }}
          >
            <Box
              component={Link}
              to={`/product/${id}`}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Order Now
            </Box>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

function Home() {
  const {
    data: products = [],
    isLoading,
    isSuccess,
  } = useGetProductsQuery();

  let content;
  if (isLoading) {
    content = <LoadingProgress />;
  } else if (isSuccess) {
    content = (
      <Container>
        <Box textAlign="center" mt={6}>
          <Typography variant="h4">Our Best Selling</Typography>
          <Typography variant="h6">Handmade With Love</Typography>
        </Box>
        <Grid container spacing={3} mt={5} justifyContent="center">
          {products.slice(0, 3).map((product) => (
            <CollectionCard key={product.id} {...product} />
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          background: `url("/images/slider1.png") center center / cover no-repeat`,
          height: "75vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "block",
            width: "100%",
            backgroundColor: "rgba(7,6,29,0.37)",
            top: 0,
            left: 0,
            zIndex: 1,
            height: "100%",
            position: "absolute",
          },
        }}
      >
        <Box sx={{ zIndex: 1, textAlign: "center", pt: 10 }}>
          <Typography
            variant="h2"
            sx={{
              color: "white",
            }}
          >
            Welcome to Zarathelle Resin and Crafts!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "white",
            }}
          >
            Specially Handmade For You
          </Typography>
        </Box>
      </Box>
      {content}
      <Footer />
    </Box>
  );
}

export default Home;
