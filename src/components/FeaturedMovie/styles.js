/* import { makeStyles } from '@mui/styles'; */
import { makeStyles } from "tss-react/mui";
export default makeStyles()((theme) => ({
  featuredCardContainer: {
    marginTop: "30px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "center",
    height: "700px",
    textDecoration: "none",
  },
  card: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  cardRoot: {
    position: "relative",
  },
  cardMedia: {
    position: "absolute",
    right: "0",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.58)",
    backgroundBlendMode: "darken",
  },
  cardContent: {
    color: "white",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cardContentRoot: {
    position: "relative",
    backgroundColor: "transparent",
  },
}));
