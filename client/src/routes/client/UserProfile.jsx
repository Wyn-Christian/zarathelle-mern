import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

function UserProfile() {
  return (
    <Box>
      <NavBar />

      <Box
        sx={{
          background: `url("/images/slider2.png") center center / cover no-repeat`,
          height: "60vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "block",
            width: "100%",
            backgroundColor: "rgba(7,6,29,0.14)",
            top: 0,
            left: 0,
            zIndex: 1,
            height: "100%",
            position: "absolute",
          },
        }}
      />
      <Container sx={{ minHeight: "20vh" }}>
        <Typography variant="h2" textAlign="center" sx={{ mt: 3 }}>
          Profile
        </Typography>
      </Container>
      <Footer />
    </Box>
  );
}

export default UserProfile;
