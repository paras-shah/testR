import { makeStyles } from "@material-ui/styles";
//SVG
import backgroundImage from "../../images/icons/web.svg";
import notificationSvg from "../../images/icons/notify-red.svg";

export default makeStyles(theme => {
    return {
        container: {
            height: "100vh",
            background: `url(${backgroundImage}) ${theme.palette.primary.main}`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "36% auto"
        },
        wrapper: {
            maxWidth: theme.breakpoints.values.lg,
            [theme.breakpoints.down("xl")]: {
                maxWidth: theme.breakpoints.values.md
            },
            [theme.breakpoints.down("lg")]: {
                maxWidth: "100%"
            },
            padding: "0 32px",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto"
        },
        loginContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },
        logotypeContainer: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        logotypeImage: {
            width: 130,
            position: "relative",
            bottom: -20,
            left: -theme.spacing(3)
        },
        welcomeText: {
            color: theme.palette.primary.contrastText,
            fontFamily: theme.font.hNeue.light,
            fontSize: 28,
            lineHeight: "34px",
            margin: 0
        },
        logotypeText: {
            color: theme.palette.primary.contrastText,
            fontFamily: theme.font.hNeue.medium,
            fontSize: 44,
            lineHeight: "54px",
            margin: 0
        },

        formContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },

        formBlock: {
            width: "100%"
        },

        formButtons: {
            width: "100%",
            marginTop: theme.spacing(4),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },

        muiLoginButton: {
            color: theme.palette.tertiary.contrastText,
            backgroundColor: theme.palette.tertiary.main,
            borderRadius: 6,
            boxShadow: "0 3px 6px 1px rgba(0,0,0,0.2)",
            width: "100%",
            fontFamily: theme.font.hNeue.medium,
            fontSize: 14,
            lineHeight: `${theme.spacing(6)}px`,
            padding: 0,
            "&:hover": {
                color: theme.palette.tertiary.contrastText,
                backgroundColor: theme.palette.tertiary.light
            },
            "&:disabled": {
                color: theme.palette.tertiary.contrastText,
                backgroundColor: theme.palette.tertiary.main,
                opacity: 0.6
            }
        },

        formDividerContainer: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            display: "flex",
            alignItems: "center"
        },
        formDividerWord: {
            color: theme.palette.tertiary.contrastText,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },
        formDivider: {
            flexGrow: 1,
            height: 1,
            backgroundColor: theme.palette.tertiary.main
        },

        loginLoader: {
            marginLeft: theme.spacing(4),
            color: theme.palette.tertiary.main
        },

        errorMessage: {
            "&:before": {
                backgroundSize: "cover",
                backgroundImage: `url(${notificationSvg})`,
                backgroundRepeat: "no-repeat",
                content: "''",
                position: "absolute",
                width: "20px",
                height: "18px",
                display: "inline-block",
                left: theme.spacing(0.5),
                top: "2px"
            },
            position: "relative",
            paddingLeft: theme.spacing(4),
            color: theme.palette.text.error,
            marginBottom: theme.spacing(2)
        },
        linkText: {
            "&:hover": {
                textDecoration: "underline"
            },
            fontFamily: theme.font.hNeue.light,
            letterSpacing: "normal",
            lineHeight: `${theme.spacing(2)}px`,
            color: theme.palette.tertiary.main,
            display: "block",
            marginBottom: theme.spacing(4.5)
        }
    };
});
