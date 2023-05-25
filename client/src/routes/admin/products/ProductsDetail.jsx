import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../../features/apiSlice";
import { api_base_url } from "../../../app/base_url";
import { PHPPrice } from "../../../app/priceFormatter";
import LoadingProgress from "../../../components/LoadingProgress";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

function DeletePrompt({ id, open, handleClose }) {
  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();

  const onYesCliecked = async () => {
    await deleteProduct(id)
      .unwrap()
      .then((res) => {
        enqueueSnackbar("Product Deleted Successfully!", {
          variant: "success",
        });
        navigate("/admin/products/list");
      });
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Card sx={{ width: { xs: "90%", sm: 300, md: 400 } }}>
        <CardContent>
          <Typography>
            Are you sure you want to permanently delete this product?
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", gap: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={onYesCliecked}
          >
            Yes
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Backdrop>
  );
}

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

function ProductsDetail() {
  const { id } = useParams();
  const {
    data: product = {},
    isLoading,
    isSuccess,
  } = useGetProductQuery(id);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  let content;
  if (isLoading) {
    content = <LoadingProgress />;
  } else if (isSuccess) {
    content = (
      <Box>
        <Typography variant="h4">Product Detail</Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-end" },
          }}
        >
          <Box>
            <Typography variant="overline">Product ID: </Typography>
            <Chip label={id} size="small" />
          </Box>
          <Stack direction="row" spacing={3}>
            <Button variant="contained" color="error" onClick={handleOpen}>
              <DeleteForeverRoundedIcon sx={{ mr: 1, fontSize: 16 }} />
              Delete
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              LinkComponent={Link}
              to={`/admin/products/${id}/update`}
            >
              <BorderColorOutlinedIcon sx={{ mr: 1, fontSize: 16 }} />
              Edit
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "flex-start" },
          }}
        >
          <Box sx={{ alignSelf: "center" }}>
            <Paper sx={{ width: { xs: 200, md: 300 } }}>
              <CardMedia
                image={`${api_base_url}${product.image_url}`}
                sx={{
                  height: { xs: 200, md: 300 },
                  width: { xs: 200, md: 300 },
                }}
              />
            </Paper>
          </Box>
          <Paper
            elevation={3}
            sx={{ flexGrow: 1, ml: { md: 3 }, mt: { xs: 3, md: 0 } }}
          >
            <Title title="Details" />
            <Info title="Name" value={product.name} />
            <Info title="Description" value={product.description} />
            <Info title="Price" value={PHPPrice.format(product.price)} />
            <Info title="Collection" value={product.collection_id.title} />
            <Info title="Category" value={product.category} />
            <Info title="Stocks" value={product.stocks} />
            <Info title="No. of Sold" value={product.num_sold} />
          </Paper>
        </Box>
        <DeletePrompt id={id} open={open} handleClose={handleClose} />
      </Box>
    );
  }

  return <Box>{content}</Box>;
}

export default ProductsDetail;
