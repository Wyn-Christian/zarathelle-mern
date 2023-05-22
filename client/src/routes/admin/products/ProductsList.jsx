import {
  Box,
  Button,
  CardMedia,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const generateProductData = (num) => ({
  id: num,
  name: `Prouct Sample ${num}`,
  description: `Product sample description ${num}`,
  image: `/images/sample/product.jpg`,
  category: num % 2 ? "ready made" : "customizable",
  collection_id: {
    title: num % 2 ? "sample collection 1" : "sample collection 2",
  },
  stocks: num % 2 ? 3 : 12,
  num_sold: num % 2 ? 123 : 54,
  status: num % 2 ? "in stocks" : "out of stocks",
});

const productSampleData = [
  generateProductData(1),
  generateProductData(2),
  generateProductData(3),
  generateProductData(4),
  generateProductData(5),
  generateProductData(6),
];
const ImageColumn = ({ row }) => {
  return (
    <Paper sx={{ m: "auto" }}>
      <CardMedia image={row.image} sx={{ height: 60, width: 60 }} />
    </Paper>
  );
};

const ViewButton = ({ params }) => {
  return (
    <Button variant="contained" sx={{ m: "auto" }}>
      <Box
        component={Link}
        to={`/admin/products/${params.id}`}
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        View
      </Box>
    </Button>
  );
};

const CategoryInfo = ({ row }) => {
  if (row.category === "ready made") {
    return <Chip label="Ready Made" color="primary" />;
  } else {
    return <Chip label="Customizable" color="secondary" />;
  }
};

const columns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    headerAlign: "center",
    renderCell: (params) => <ImageColumn {...params} />,
  },
  { field: "name", headerName: "Name", width: 150 },
  { field: "description", headerName: "Description", width: 250 },
  {
    field: "category",
    headerName: "Cateogry",
    width: 140,
    renderCell: (params) => <CategoryInfo {...params} />,
  },
  { field: "stocks", headerName: "Stocks", type: "number", width: 100 },
  {
    field: "num_sold",
    headerName: "No. of Sold",
    type: "number",
    width: 120,
  },
  {
    field: "id",
    headerName: "Action",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => <ViewButton params={params} />,
  },
];

function ProductsList() {
  return (
    <Box>
      <Typography variant="h4">List of Products</Typography>
      <Box sx={{ mt: 3 }}>
        <DataGrid
          rowHeight={100}
          rows={productSampleData}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          sx={{
            boxShadow: 2,
            border: 1,
          }}
        />
      </Box>
    </Box>
  );
}

export default ProductsList;
