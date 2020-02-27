import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        display: "flex",
        overflowX: "hidden",
        backgroundColor: theme.palette.background.grey_dark,
        flexDirection: "column"
    },
    wrapper: {
        maxWidth: theme.breakpoints.values.maxWidth,
        width:"100vw",
        margin: "0 auto",
    },
    wrapperBody: {
        marginTop: theme.spacing(4.5),
        marginBottom: theme.spacing(5),
    },
    contentContainer: {
        flexGrow: 1,
        padding: "0 20px",
        margin: "0 12px",
    },
    contentBody: {
        minHeight: "100vh",
        backgroundColor: theme.palette.background.none,
        borderRadius: theme.spacing(1),
        padding: "28px 20px 50px",
        margin: "0 12px 50px",
    },
    contentShift: {
        width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    fakeToolbar:  {
        minHeight: theme.breakpoints.values.appBarHeight,
        [theme.breakpoints.down("sm")]: {
            minHeight: theme.breakpoints.values.appBarHeightMobile,
        }
    }
}));
