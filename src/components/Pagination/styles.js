/* import { makeStyles } from '@mui/styles'; */
import { makeStyles } from "tss-react/mui";
export default makeStyles()((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: "30px 5px",
  },
  pageNumber: {
    margin: "0 20px !important",
    color: "theme.palette.text.primary,",
  },
}));
