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
  title: `Collection Sample ${num}`,
  description: `Collection sample description ${num}`,
  category: num % 2 ? "ready made" : "customizable",
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
        to={`/admin/collections/${params.id}`}
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
  { field: "title", headerName: "Title", width: 150 },
  { field: "description", headerName: "Description", width: 250 },
  {
    field: "category",
    headerName: "Cateogry",
    width: 140,
    renderCell: (params) => <CategoryInfo {...params} />,
  },
  {
    field: "id",
    headerName: "Action",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => <ViewButton params={params} />,
  },
];

function CollectionsList() {
  return (
    <Box>
      <Typography variant="h4">List of Collections</Typography>
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

export default CollectionsList;
