import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

export const HeaderInput = withStyles(theme => ({
    root: {
        "label + &": {
            marginLeft: theme.spacing(0),
            fontFamily: theme.font.hNeue.light,
            ...theme.typography.body1,
            width: "100%"
        },
        "& .MuiSelect-root": {
            padding: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`
        },
        ".pageSelect &": {
            width: "100%",
            marginTop: theme.spacing(2),
            color: theme.palette.text.tertiary,
            textTransform: "capitalize",
            ...theme.typography.body1,
            "& .MuiSelect-root": {
                padding: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`
            },
        }

    },
    input: {
        backgroundColor: fade(theme.palette.common.black, 0),
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: [theme.font.hNeue.light, "sans-serif"].join(","),
        "&:focus": {
            backgroundColor: fade(theme.palette.common.black, 0.08)
        }
    }
}))(InputBase);

export const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%"
    },
    formControl: {
        width: "100%"
    }
}));
