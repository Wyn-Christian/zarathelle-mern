import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const CollectionCard = ({ id, image, title, description, price }) => {
  const theme = useTheme();
  return (
    <Grid xs={12} sm={8} md={4}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <CardMedia
            sx={{ height: 200 }}
            alt="collection sample"
            image={`/images/sample/${image}`}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </Box>
        <CardActions sx={{ ml: 4, mr: 5 }}>
          <Typography sx={{ flexGrow: 1 }} fontWeight="bold">
            ₱{price}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            sx={{
              fontWeight: "bold",
              color: theme.palette.secondary.main,
              borderColor: theme.palette.secondary.main,
            }}
          >
            <Box
              component={Link}
              to={`/collections/${id}`}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Order Now
            </Box>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

function Home() {
  return (
    <Box>
      <Box
        sx={{
          background: `url("/images/slider1.png") center center / cover no-repeat`,
          height: "75vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "block",
            width: "100%",
            backgroundColor: "rgba(7,6,29,0.37)",
            top: 0,
            left: 0,
            zIndex: 1,
            height: "100%",
            position: "absolute",
          },
        }}
      >
        <Box sx={{ zIndex: 1, textAlign: "center", pt: 10 }}>
          <Typography
            variant="h2"
            sx={{
              color: "white",
            }}
          >
            Welcome to Zarathelle Resin and Crafts!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "white",
            }}
          >
            Specially Handmade For You
          </Typography>
        </Box>
      </Box>
      <Container>
        <Box textAlign="center" mt={6}>
          <Typography variant="h4">Our Best Selling</Typography>
          <Typography variant="h6">Handmade With Love</Typography>
        </Box>
        <Grid container spacing={3} mt={5} justifyContent="center">
          <CollectionCard
            id={12}
            image={"collection.jpg"}
            title={"Sample Title"}
            description={"sample description"}
            price={100}
          />
          <CollectionCard
            id={12}
            image={"collection.jpg"}
            title={"Sample Title"}
            description={`"Choose to live for the moments that make your soul glow." Introducing our Glow in the Dark Line Art Necklace made specially for you? Available in Rectangle and Square Pendants!`}
            price={100}
          />
          <CollectionCard
            id={12}
            image={"collection.jpg"}
            title={"Sample Title"}
            description={`"The destination is not everything. So before you reach the end, keep your eyes open. Use the chance to take in the world around you..." Introducing our first ever Genshin Impact inspired necklaces made specially for you.`}
            price={100}
          />
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default Home;
