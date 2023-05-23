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

const generateCollectionData = (num) => ({
  id: num,
  user: { id: `user-${num}`, username: `username-${num}` },
  items: [
    {
      id: `order-${num}`,
      product: { id: `product-${num}`, name: `product-name-${num}` },
    },
  ],
  status: num % 2 ? "on its way" : "delivered",
  total_price: num % 2 ? 1234.23 : 4423.32,
  total_quantity: num % 2 ? 3 : 13,
  image: `/images/sample/collection.jpg`,
});

const collectionSampleData = [
  generateCollectionData(1),
  generateCollectionData(2),
  generateCollectionData(3),
  generateCollectionData(4),
  generateCollectionData(5),
  generateCollectionData(6),
];

const ViewButton = ({ params }) => {
  return (
    <Button variant="contained" sx={{ m: "auto" }}>
      <Box
        component={Link}
        to={`/admin/orders/${params.id}`}
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        View
      </Box>
    </Button>
  );
};

const StatusInfo = ({ row }) => {
  if (row.status === "to process") {
    return <Chip label="To Process" color="warning" />;
  } else if (row.status === "on its way") {
    return <Chip label="On Its Way" color="info" />;
  } else {
    return <Chip label="Delivered" color="success" />;
  }
};

const columns = [
  {
    field: "user",
    headerName: "User",
    width: 100,
    headerAlign: "center",
    // renderCell: (params) => <ImageColumn {...params} />,
    // format: (user) => user,
    valueFormatter: (user) => user.value.username,
  },
  {
    field: "total_price",
    headerName: "Total Price",
    type: "number",
    width: 110,
  },
  {
    field: "total_quantity",
    headerName: "Total Quantity",
    type: "number",
    width: 110,
  },
  {
    field: "category",
    headerName: "Cateogry",
    width: 140,
    renderCell: (params) => <StatusInfo {...params} />,
  },
  {
    field: "id",
    headerName: "Action",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => <ViewButton params={params} />,
  },
];

function OrdersList() {
  return (
    <Box>
      <Typography variant="h4">List of Orders</Typography>
      <Box sx={{ mt: 3 }}>
        <DataGrid
          rowHeight={100}
          rows={collectionSampleData}
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

export default OrdersList;
