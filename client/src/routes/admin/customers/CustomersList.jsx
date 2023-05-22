import { Box, Button, CardMedia, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const generateUserData = (num) => ({
  id: num,
  username: `sample${num}`,
  email: `sample${num}@gmail.com`,
  address: `sample ${num} address`,
  phone: `0921-${num}`,
  image: `/images/sample/product.jpg`,
});

const userSampleData = [
  generateUserData(1),
  generateUserData(2),
  generateUserData(3),
  generateUserData(4),
  generateUserData(5),
  generateUserData(6),
];
const ImageColumn = ({ row }) => {
  return (
    <Paper>
      <CardMedia image={row.image} sx={{ height: 60, width: 60 }} />
    </Paper>
  );
};
const CountButton = ({ params }) => {
  return (
    <Button variant="contained" sx={{ m: "auto" }}>
      <Box
        component={Link}
        to={`/admin/customers/${params.id}`}
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        View
      </Box>
    </Button>
  );
};

const columns = [
  {
    field: "image",
    headerName: "Image",
    width: 90,
    renderCell: (params) => <ImageColumn {...params} />,
  },
  { field: "username", headerName: "User Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone", width: 150 },
  {
    field: "id",
    headerName: "Action",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => <CountButton params={params} />,
  },
];

function CustomersList() {
  useEffect(() => {
    console.log(userSampleData);
  });
  return (
    <Box>
      <Typography variant="h4">List of Customers</Typography>
      <Box sx={{ mt: 3 }}>
        <DataGrid
          rowHeight={100}
          rows={userSampleData}
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

export default CustomersList;
