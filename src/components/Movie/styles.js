/* import { makeStyles } from '@mui/styles'; */

import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  movie: {
    padding: "10px",
  },
  links: {
    alignItems: "center",
    fontWeight: "bolder",
    textDecoration: "none",
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  image: {
    borderRadius: "20px",
    height: "260px",
    marginBottom: "10px",
    marginTop: "30px",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  title: {
    color: theme.palette.text.primary,
    // adds ... to loong sentence
    textOverflow: "ellipsis",
    width: "180px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginTop: "10px",
    marginBottom: "0",
    textAlign: "center",
  },
}));
