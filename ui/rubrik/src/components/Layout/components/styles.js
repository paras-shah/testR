import { withStyles } from "@material-ui/styles";

export default withStyles(theme => {
    return {
        textField: {
            width: "100%",
            marginTop: 0,
            marginBottom: theme.spacing(3)
        },
        textAreaField: {
            width: "100%",
            marginTop: 0,
            marginBottom: theme.spacing(3)
        },
        textFieldBlock: {
            position: "relative",
        },
        message: {
            width: "90%",
            marginTop: 0,
            marginBottom: theme.spacing(2),
            "&.success":{
                color: theme.palette.success.dark,
            },
            "&.error":{
                color: theme.palette.warning.main,
            },
        },
        /* Upload */
        files: {
            marginTop: 0,
            marginBottom: theme.spacing(3)
        }
    };
});
