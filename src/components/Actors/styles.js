/* import { makeStyles } from '@mui/styles'; */
import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  containerSpaceAround: {
    display: "flex",
    // justifyContent: "space-around",

    margin: "30px 0 !important",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  image: {
    maxWidth: "90%",
    borderRadius: "30px",
    objectFit: "cover",
    boxShadow: "0.3em 0.3em 0.3em rgb(64, 64, 70)",
  },
}));
