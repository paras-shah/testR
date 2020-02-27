import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.default,
    },
  },
  linkActive: {
    backgroundColor: theme.palette.background.light,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
    },
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "#FFFFFF",
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
    "& svg":{
      width:"1em",
      height:"1em"
    }
  },
  linkIconActive: {
    color: "green",
  },
  linkText: {
    padding: 0,
    color: theme.palette.text.secondary + "CC",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
  },
  linkTextActive: {
    color: theme.palette.text.primary,
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: theme.sideBarDivider,
  },
  customLinkIcon:{
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: theme.spacing(3),
    flexDirection: "row",
    justifyContent: "center",
    marginRight: theme.spacing(1),
  }
}));
