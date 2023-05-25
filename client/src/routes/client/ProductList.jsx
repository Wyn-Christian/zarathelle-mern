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
  useAddToCartMutation,
  useGetCollectionQuery,
  useGetProductsOfCollectionQuery,
} from "../../features/apiSlice";
import { api_base_url } from "../../app/base_url";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/usersSlice";
import { PHPPrice } from "../../app/priceFormatter";
import { enqueueSnackbar } from "notistack";

const ProductCard = ({
  id,
  name,
  description,
  image_url,
  category,
  price,
}) => {
  const [addToCart] = useAddToCartMutation();
  const user = useSelector(userSelector);

  const addToCartClicked = async () => {
    if (user.id) {
      await addToCart({ user: user.id, product: id });
    } else {
      console.log("Please Log in first!");
      enqueueSnackbar("Please Log in first!", { variant: "warning" });
    }
  };

  let customButton;
  if (category === "ready made") {
    customButton = (
      <Button
        size="small"
        variant="outlined"
        sx={{
          fontWeight: "bold",
          color: "#e78686",
          borderColor: "#e78686",
          ml: 2,
        }}
        onClick={addToCartClicked}
      >
        Add To Cart
      </Button>
    );
  } else {
    customButton = (
      <Button
        size="small"
        LinkComponent={Link}
        to={`/product/${id}`}
        variant="outlined"
        sx={{
          fontWeight: "bold",
          color: "#e78686",
          borderColor: "#e78686",
          ml: 2,
        }}
      >
        Customize
      </Button>
    );
  }
  return (
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
            <Typography variant="h5" fontWeight="bold">
              {name.toUpperCase()}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ ml: 4, mr: 5 }}>
          <Typography sx={{ flexGrow: 1 }} fontWeight="bold">
            {PHPPrice.format(price)}
          </Typography>
          {customButton}
        </CardActions>
      </Card>
    </Grid>
  );
};

function ProductList() {
  const { id } = useParams();

  const {
    data: collection = {
      title: "",
      description: "",
      image: "",
      category: "",
    },
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
          height: { xs: "90vh", md: "60vh" },
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
        <Container sx={{ zIndex: 1, mt: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: { xs: "center", sm: "start" },
            }}
          >
            <Box>
              <Card
                elevation={3}
                sx={{
                  height: { xs: 200, sm: 300 },
                  width: { xs: 200, sm: 300 },
                  m: 1,
                }}
              >
                <CardMedia
                  image={`${api_base_url}${collection.image_url}`}
                  sx={{
                    height: { xs: "93%", sm: "95%" },

                    m: 1,
                  }}
                />
              </Card>
            </Box>
            <Box
              ml={3}
              mt={4}
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              <Typography variant="h4" fontWeight="bold">
                {collection.title.toUpperCase()}
              </Typography>
              <Typography variant="caption">
                {collection.category.toUpperCase()}
              </Typography>
              <Typography variant="body1">
                {collection.description}
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
