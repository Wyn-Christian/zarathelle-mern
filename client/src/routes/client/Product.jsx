import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userSelector } from "../../features/usersSlice";

// MUI Component
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer";
import {
  useAddToCartMutation,
  useGetProductQuery,
} from "../../features/apiSlice";
import { api_base_url } from "../../app/base_url";
import CircularProgress from "@mui/material/CircularProgress";
import { MuiFileInput } from "mui-file-input";
import { enqueueSnackbar } from "notistack";
function Product() {
  const { id } = useParams();
  const {
    data: product = {},
    isLoading,
    isSuccess,
  } = useGetProductQuery(id);
  const user = useSelector(userSelector);
  const [addToCart] = useAddToCartMutation(user.id);

  const [file, setFile] = useState(null);

  const handleFileChange = (newFile) => {
    setFile(newFile);
  };

  const addToCartReadyMade = async () => {
    if (user.id) {
      await addToCart({ user: user.id, product: product.id })
        .unwrap()
        .then((res) => {
          enqueueSnackbar("Added to cart successfully!", {
            variant: "success",
          });
        });
    } else {
      enqueueSnackbar("Please Log in First!", {
        variant: "warning",
        preventDuplicate: true,
      });
    }
  };

  const addToCartCustomizable = async () => {
    if (user.id) {
      if (file !== null) {
        const new_cart = new FormData();
        new_cart.append("user", user.id);
        new_cart.append("product", product.id);
        new_cart.append("image", file);

        console.log({
          user: user.id,
          product: product.id,
          image: file,
        });

        await addToCart(new_cart)
          .unwrap()
          .then((res) => {
            enqueueSnackbar("Added to cart successfully!", {
              variant: "success",
            });

            setFile(null);
          });
      } else {
        enqueueSnackbar("Please upload your custom photo first!", {
          variant: "warning",
          preventDuplicate: true,
        });
      }
    } else {
      enqueueSnackbar("Please Log in First!", {
        variant: "warning",
        preventDuplicate: true,
      });
    }
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
    let customButton;
    if (product.category === "ready made") {
      customButton = (
        <Box display="flex" flexDirection="column">
          <Button
            variant="contained"
            sx={{ width: 200 }}
            onClick={addToCartReadyMade}
          >
            Add to Cart
          </Button>
        </Box>
      );
    } else {
      customButton = (
        <Box display="flex" flexDirection="column">
          <MuiFileInput
            value={file}
            onChange={handleFileChange}
            placeholder="Place your custom photo"
            sx={{ mb: 3, maxWidth: 355 }}
          />
          <Button
            variant="contained"
            sx={{ width: 200 }}
            onClick={addToCartCustomizable}
          >
            Add to Cart yeahh
          </Button>
        </Box>
      );
    }

    content = (
      <Container sx={{ minHeight: "20vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10,
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "space-between" },
          }}
        >
          <Card sx={{ width: { xs: 208, md: 418 } }}>
            <CardMedia
              sx={{
                height: { xs: 190, md: 400 },
                width: { xs: 190, md: 400 },
                m: 1.1,
              }}
              image={`${api_base_url}${product?.image_url}`}
            />
          </Card>
          <Box
            sx={{
              ml: { md: 4 },
              mt: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: { md: 380 },
            }}
          >
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                minHeight: 180,
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                Product Title
              </Typography>
              <Typography variant="h6">
                Type: {product?.category.toUpperCase()}
              </Typography>
              <Typography variant="h6">
                Stocks: {product?.stocks}
              </Typography>
              <Typography variant="body2">
                {product?.description}
              </Typography>
            </Box>
            {customButton}
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          background: `url("/images/banner.jpg") center center / cover no-repeat`,
          height: { xs: "80vh", md: "60vh" },
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

      {content}
      <Footer />
    </Box>
  );
}

export default Product;
