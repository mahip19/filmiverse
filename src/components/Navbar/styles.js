/* import { makeStyles } from '@mui/styles'; */
import { makeStyles } from "tss-react/mui";
export default makeStyles()((theme) => ({
  toolbar: {
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "240px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      flexWrap: "wrap",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));
