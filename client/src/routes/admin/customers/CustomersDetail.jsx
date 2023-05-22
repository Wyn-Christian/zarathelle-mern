import {
  Box,
  Button,
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

function CustomersDetail() {
  const { id } = useParams();
  return (
    <Box>
      <Typography variant="h4">Customer Detail</Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Box>
          <Typography variant="overline">User ID: </Typography>
          <Chip label="12312312312" size="small" />
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
      <Paper elevation={3} sx={{ mt: 3 }}>
        <Title title="Name" />
        <Info title="First Name" value="Sample Name" />
        <Info title="Last Name" value="Sample Name" />
      </Paper>

      <Paper elevation={3} sx={{ mt: 3 }}>
        <Title title="Account" />
        <Info title="Username" value="Sample User Name" />
        <Info title="Email" value="Sample@gmail.com" />
      </Paper>

      <Paper elevation={3} sx={{ mt: 3 }}>
        <Title title="Contacts" />
        <Info title="Address" value="Sample Address customer." />
        <Info title="Phone number" value="09214765154 pa gcash huehue" />
      </Paper>
    </Box>
  );
}

export default CustomersDetail;
