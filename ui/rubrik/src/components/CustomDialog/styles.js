import { makeStyles } from "@material-ui/styles";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: "2px",
    top: theme.spacing(1),
    backgroundColor: theme.palette.background.tab,
    "&:hover": {
      backgroundColor: theme.palette.background.tableShadeThree,
    }
  },
});

const useStyles = makeStyles(theme => ({
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
}));

export { styles, useStyles };
