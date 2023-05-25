import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Chip,
  Card,
  CardActions,
  CardContent,
  Divider,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import {
  useDeleteCollectionMutation,
  useGetCollectionQuery,
} from "../../../features/apiSlice";
import { api_base_url } from "../../../app/base_url";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

function DeletePrompt({ id, open, handleClose }) {
  const navigate = useNavigate();
  const [deleteCollection] = useDeleteCollectionMutation();

  const onYesCliecked = async () => {
    await deleteCollection(id)
      .unwrap()
      .then((res) => {
        enqueueSnackbar(
          "Collection and its products are deleted Successfully!",
          {
            variant: "success",
          }
        );
        navigate("/admin/collections/list");
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
            Are you sure you want to permanently delete this collection and
            its preceding products?
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

function CollectionsDetail() {
  const { id } = useParams();
  const {
    data: collection = {},
    isLoading,
    isSuccess,
  } = useGetCollectionQuery(id);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
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
    content = (
      <Box>
        <Typography variant="h4">Collections Detail</Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column", md: "row" },

            alignItems: { xs: "center", md: "flex-end" },
          }}
        >
          <Box>
            <Typography variant="overline">Collection ID: </Typography>
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
              to={`/admin/collections/${id}/update`}
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
                image={`${api_base_url}${collection.image_url}`}
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
            <Info title="Title" value={collection.title} />
            <Info title="Description" value={collection.description} />
            <Info title="Category" value={collection.category} />
          </Paper>
        </Box>
        <DeletePrompt id={id} open={open} handleClose={handleClose} />
      </Box>
    );
  }
  return <Box>{content}</Box>;
}

export default CollectionsDetail;
