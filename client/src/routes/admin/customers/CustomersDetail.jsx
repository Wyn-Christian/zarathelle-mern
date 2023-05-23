import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Link, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../features/apiSlice";
import { api_base_url } from "../../../app/base_url";

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

function CustomersDetail() {
  const { id } = useParams();
  const { data: user = {}, isLoading, isSuccess } = useGetUserQuery(id);

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
        <Typography variant="h4">Customer Detail</Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Typography variant="overline">User ID: </Typography>
            <Chip label={id} size="small" />
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            LinkComponent={Link}
            to={`/admin/customers/${id}/update`}
          >
            <BorderColorOutlinedIcon sx={{ mr: 1, fontSize: 16 }} />
            Edit
          </Button>
        </Box>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid xs={12} md={6}>
            <Avatar
              src={`${api_base_url}${user.image_url}`}
              alt="sample"
              sx={{
                height: 150,
                width: 150,
                m: "auto",
                boxShadow: 6,
              }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Paper elevation={3}>
              <Title title="Name" />
              <Info title="First Name" value={user.first_name} />
              <Info title="Last Name" value={user.last_name} />
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper elevation={3}>
              <Title title="Account" />
              <Info title="Username" value={user.username} />
              <Info title="Email" value={user.email} />
            </Paper>
          </Grid>

          <Grid xs={12} md={6}>
            <Paper elevation={3}>
              <Title title="Contacts" />
              <Info title="Address" value={user.address} />
              <Info title="Phone number" value={user.phone} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
  return <Box>{content}</Box>;
}

export default CustomersDetail;
