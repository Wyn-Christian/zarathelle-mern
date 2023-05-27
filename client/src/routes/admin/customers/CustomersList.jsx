import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../../features/apiSlice";
import { api_base_url } from "../../../app/base_url";

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
    <Avatar
      src={`${api_base_url}${row.image_url}`}
      alt={row.username}
      sx={{ width: 56, height: 56, m: "auto" }}
    />
  );
};
const CountButton = ({ params }) => {
  return (
    <Button
      LinkComponent={Link}
      to={`/admin/customers/${params.id}`}
      variant="contained"
      sx={{ m: "auto" }}
    >
      View
    </Button>
  );
};

const columns = [
  {
    field: "image",
    headerName: "Profile Pic",
    width: 100,
    headerAlign: "center",

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
  const { data: users = [] } = useGetUsersQuery();
  return (
    <Box>
      <Typography variant="h4">List of Customers</Typography>
      <Box sx={{ mt: 3 }}>
        <DataGrid
          rowHeight={100}
          rows={users}
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
