import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Grid from "@mui/material/Unstable_Grid2";
import {
  useGetCollectionQuery,
  useGetProductsOfCollectionQuery,
} from "../../features/apiSlice";
import { api_base_url } from "../../app/base_url";

const ProductCard = ({ id, name, description, image_url }) => (
  <Grid
    xs={12}
    sm={6}
    md={4}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Card
      sx={{
        maxWidth: 400,
        width: 290,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea LinkComponent={Link} to={`/product/${id}`}>
        <CardMedia
          sx={{ height: 300 }}
          image={`${api_base_url}${image_url}`}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ ml: 4, mr: 5 }}>
        <Typography sx={{ flexGrow: 1 }} fontWeight="bold">
          ₱100.00
        </Typography>
        <Button
          size="small"
          variant="outlined"
          sx={{
            fontWeight: "bold",
            color: "#e78686",
            borderColor: "#e78686",
            ml: 2,
          }}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

function ProductList() {
  const { id } = useParams();

  const {
    data: collection = {
      title: "",
      description: "",
      image: "",
      category: "",
    },
    isFetching,
    isSuccess,
  } = useGetCollectionQuery(id);

  const {
    data: products = [],
    isLoading,
    isSuccess: isProductsSuccess,
    isError,
    error,
  } = useGetProductsOfCollectionQuery(id);

  return (
    <Box>
      <Box
        sx={{
          background: `url("/images/collections.png") center center / cover no-repeat`,
          height: "60vh",
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
      >
        <Container sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: { xs: "center", sm: "start" },
            }}
          >
            <Card
              elevation={3}
              sx={{
                height: { xs: 300, sm: 300 },
                width: { xs: 300, sm: 300 },
                m: 1,
              }}
            >
              <CardMedia
                image={`/images/sample/collection.jpg`}
                sx={{
                  height: "95%",

                  m: 1,
                }}
              />
            </Card>
            <Box ml={3} mt={4}>
              <Typography variant="h4">{collection.title}</Typography>
              <Typography variant="body1">
                Sample Collection Description
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container
        sx={{
          mt: 3,
          minHeight: "20vh",
        }}
      >
        <Grid container spacing={3}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default ProductList;
