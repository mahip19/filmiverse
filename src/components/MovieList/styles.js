/* import { makeStyles } from '@mui/styles'; */
import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  moviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));
