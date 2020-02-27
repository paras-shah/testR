import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
//SVG
import labSvg from "../../images/icons/flask.svg";
import createLabSvg from "../../images/icons/flask-bubble.svg";
import myLabSvg from "../../images/icons/flask-fill.svg";

export default makeStyles(theme => ({
    pageTitleContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(1),
        "&.createLab": {
            marginBottom: theme.spacing(3),
            marginTop: 0
        }
    },
    pageTitle: {
        "&:before": {
            position: "absolute",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            content: "''",
            display: "inline-block",
            width: theme.spacing(2),
            height: theme.spacing(3),
            top: 0,
            left: 0
        },
        "&.lab:before": {
            backgroundImage: `url(${labSvg})`,
            paddingRight: theme.spacing(1)
        },
        "&.myLabs:before": {
            backgroundImage: `url(${myLabSvg})`,
            paddingRight: theme.spacing(1),
            width: theme.spacing(2.125),
            height: theme.spacing(2.875),
        },
        "&.createLab:before": {
            backgroundImage: `url(${createLabSvg})`,
            width: theme.spacing(2.125),
            height: theme.spacing(3.25),
            paddingRight: theme.spacing(1)
        },
        "&.MuiTypography-root": {
            lineHeight: "1.5rem" //24
        },
        "&.createLab.MuiTypography-root": {
            lineHeight: "1.7rem"
        },
        paddingLeft: theme.spacing(3),
        color: theme.palette.primary.main,
        textTransform: "uppercase",
        position: "relative"
    },
    button: {
        boxShadow: theme.customShadows.widget,
        textTransform: "none",
        "&:active": {
            boxShadow: theme.customShadows.widgetWide
        }
    },
    search: {
        display: "none",
        position: "relative",
        borderRadius: 25,
        paddingLeft: theme.spacing(2.5),
        width: 36,
        backgroundColor: fade(theme.palette.common.black, 0),
        transition: theme.transitions.create(["background-color", "width"]),
        "&:hover": {
            cursor: "pointer",
            backgroundColor: fade(theme.palette.common.black, 0.08)
        }
    },
    searchFocused: {
        backgroundColor: fade(theme.palette.common.black, 0.08),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "80%"
        }
    },
    searchIcon: {
        width: 36,
        right: 0,
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: theme.transitions.create("right"),
        "&:hover": {
            cursor: "pointer"
        }
    },
    searchIconOpened: {
        right: theme.spacing(1.25)
    }
}));
