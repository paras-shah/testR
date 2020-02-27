import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    widgetWrapper: {
        display: "flex",
        minHeight: "100%"
    },
    widgetHeader: {
        padding: theme.spacing(3),
        paddingBottom: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    widgetRoot: {
        boxShadow: theme.customShadows.widgetBasic,
        borderRadius: "10px"
    },
    widgetBody: {
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
    noPadding: {
        padding: 0
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
    },
    moreButton: {
        marginTop: -theme.spacing(1),
        padding: 0,
        width: 40,
        height: 40,
        color: theme.palette.text.hint,
        "&:hover": {
            backgroundColor: theme.palette.link.main,
            color: "rgba(255, 255, 255, 0.35)"
        }
    },
    widgetLink: {
        color: theme.palette.link.main,
        textDecoration:'none',
        "&:hover": {
            color: theme.palette.link.light
        }
    }
}));

export const ToolTipStyle = withStyles(theme => ({
    tooltip: {
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        backgroundColor: theme.palette.tertiary.main,
        color: theme.palette.tertiary.contrastText,
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(14),
        border: `2px solid ${theme.palette.tertiary.main}`
    }
}));
