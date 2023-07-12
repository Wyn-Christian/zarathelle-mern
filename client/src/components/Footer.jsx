import { Box, IconButton, Typography, useTheme } from "@mui/material";

// MUI Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const TikTokIcon = ({ color = "#000000" }) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="100%"
      height="100%"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};

function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: 10,
        pt: 3,
        pb: 3,
        backgroundColor: theme.palette.primary.main,
        textAlign: "center",
      }}
    >
      <img src="/images/zarathelle-logo.png" height={100} />
      <Typography variant="subtitle2" color="#9c9da5">
        Copyright © Zarathelle Resin and Crafts. All rights reserved.
      </Typography>
      <Box>
        <IconButton>
          <FacebookIcon 
          sx={{ color: "black" }} 
          onClick={() => window.open(' https://www.facebook.com/zarathelle.ph?mibextid=ZbWKwL')}
          />
        </IconButton>
        <IconButton>
          <InstagramIcon sx={{ color: "black" }} />
        </IconButton>
        <IconButton style={{ height: 40 }}>
          <TikTokIcon />
        </IconButton>
        <IconButton>
          <ShoppingCartIcon sx={{ color: "black" }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;
