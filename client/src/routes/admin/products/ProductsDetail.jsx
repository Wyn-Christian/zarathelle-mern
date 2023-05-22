import {
  Box,
  Button,
  CardMedia,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Link, useParams } from "react-router-dom";

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
  return (
    <Box>
      <Typography variant="h4">Product Detail</Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ alignItems: { xs: "center", sm: "flex-end" } }}
      >
        <Box>
          <Typography variant="overline">Product ID: </Typography>
          <Chip label="1234132413413241234" size="small" />
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          LinkComponent={Link}
          to={`/admin/products/${id}/update`}
        >
          <BorderColorOutlinedIcon sx={{ mr: 1, fontSize: 16 }} />
          Edit
        </Button>
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
              image="/images/sample/product.jpg"
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
          <Info title="Name" value="Sample Product Title" />
          <Info title="Description" value="Sample Product Description" />
          <Info
            title="Collection"
            value="Sample Product Collection Type"
          />
          <Info title="Category" value="Ready Made" />
          <Info title="Stocks" value={32} />
          <Info title="No. of Sold" value={32} />
        </Paper>
      </Box>
    </Box>
  );
}

export default ProductsDetail;
