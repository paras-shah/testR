import { withStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
// SVG
import logoSvg from "../../images/icons/rubrik-logo.svg";
import helpSvg from "../../images/icons/question.svg";

export default withStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main,
        transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        minHeight: "95px"
    },
    topHeader: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    siteLogo: {
        width: "52%",
        order: 1,
        [theme.breakpoints.down("md")]: {
            width: "42%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "52%",
        },
        [theme.breakpoints.down("xs")]: {
            width: `calc(100% - 50px)`,
        },
    },
    vduSelect: {
        width: `calc(20% - 100px)`,
        order: 3,
        [theme.breakpoints.down("md")]: {
            width: `calc(30% - 100px)`,
        },
        [theme.breakpoints.down("sm")]: {
            order: 2,
            width: `calc(48% - 100px)`,
        },
        [theme.breakpoints.down("xs")]: {
            order: 3,
            width: "45%",
            marginTop: "15px",
        },
        "& label": {
            position: "absolute",
            top: "3px",
            left: "18px",
            color: "white",
            fontSize: "14px",
            "&.Mui-focused": {
                color: "white",
            }
        },
        "& .MuiSelect-root": {
            padding: "14px 24px 1px 16px",
            fontSize: "15px"
        }
    },
    userOption: {
        width: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        order: 4,
        [theme.breakpoints.down("sm")]: {
            order: 3,
        },
        [theme.breakpoints.down("xs")]: {
            order: 2,
            width: "50px"
        }
    },

    toolbar: {},
    hide: {
        display: "none"
    },
    grow: {
        flexGrow: 1
    },
    logotype: {
        "&:before": {
            backgroundSize: "cover",
            backgroundImage: `url(${logoSvg})`,
            backgroundRepeat: "no-repeat",
            content: "''",
            display: "inline-block",
            width: "40px",
            height: "40px",
            marginRight: theme.spacing(1.5),
            position: "absolute",
            left: 0
        },
        "&.MuiTypography-h1": {
            position: "relative",
            color: theme.palette.primary.contrastText,
            lineHeight: `${theme.spacing(5)}px`,
            paddingLeft: theme.spacing(6.25),
        }
    },

    // Search
    search: {
        width: "26%",
        marginRight: "2%",
        [theme.breakpoints.down("sm")]: {
            order: 4,
            width: "100%",
            marginRight: "0",
            marginTop: "15px",
        },
        [theme.breakpoints.down("xs")]: {
            width: "45%",
        },
        "&:hover": {
            cursor: "pointer",
            backgroundColor: fade(theme.palette.common.black, 0.08)
        },
        order: 2,
        position: "relative",
        borderRadius: 25,
        backgroundColor: fade(theme.palette.common.black, 0),
        transition: theme.transitions.create(["background-color", "width"]),
    },
    searchFocused: {
        backgroundColor: fade(theme.palette.common.black, 0.08),
        position: "relative"
    },
    searchButton: {
        backgroundColor: theme.palette.tertiary.main,
        borderRadius: "0 6px 6px 0",
        width: 35,
        height: "100%",
        position: "absolute",
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: theme.transitions.create("right"),
        cursor: "pointer",
        zIndex: 1,
        "&:hover": {
            cursor: "pointer"
        }
    },
    searchIcon: {
        fontSize: 20,
        color: theme.palette.primary.contrastText
    },
    inputRoot: {
        ".MuiToolbar-root &": {
            width: "100%",
            color: theme.palette.primary.contrastText,
            borderRadius: theme.spacing(0.75),
            border: `solid 1px ${theme.palette.tertiary.main}`,
        }
    },
    searchInput: {
        ".MuiToolbar-root &": {
            // ".MuiInputBase-root input"
            height: theme.spacing(5),
            padding: `0 ${theme.spacing(6)}px 0 ${theme.spacing(2)}px`,
            width: "100%"
        }
    },

    // Drop downs
    vduArea: {
        minWidth: "75%",
        [theme.breakpoints.down("lg")]: {
            minWidth: "unset",
            width: "125px",
        },
        [theme.breakpoints.down("md")]: {
            minWidth: "unset",
            width: "100px",
        },
        
    },

    //Icons
    headerMenuButton: {
        overflow: "hidden",
        height: theme.spacing(5),
        width: theme.spacing(5),
        border: `solid 2px ${theme.palette.tertiary.main}`,
        padding: 0,
        "& .MuiIconButton-label": {
            height: theme.spacing(3.5),
            width: theme.spacing(3.5),
        }
    },
    headerIcon: {
        position: "relative",
        top: "6px",
        fontSize: "40px",
        color: theme.palette.tertiary.main
    },

    // Get help 
    helpIcon: {
        "&:before": {
            backgroundSize: "cover",
            backgroundImage: `url(${helpSvg})`,
            backgroundRepeat: "no-repeat",
            content: "''",
            display: "inline-block",
            width: "41px",
            height: "41px",
            position: "absolute",
        },
        "&.disabled": {
            opacity:0.5
        },
        width: "41px",
        height: "41px",
        display: "block",
        cursor: "pointer",
        marginRight: theme.spacing(1),
        [theme.breakpoints.down("xs")]: {
            display: "none",
        }
    },

    // Menu
    headerMenu: {
        marginTop: 0,
        "&.MuiPopover-root .MuiPaper-root": {
            borderRadius: "6px",
            boxShadow: theme.customShadows.widgetDark,
        }
    },

    // Header Menu - Profile 
    profileMenu: {
        width: "315px",
        "& .MuiMenu-list": {
            paddingBottom: 0
        },
        "& .MuiListItem-root:nth-child(1)": {
            borderBottom: "0.3px solid rgba(110,110,110,0.5)",
            paddingBottom: theme.spacing(2)
        },
        "& .MuiListItem-root:nth-child(even):hover": {
            backgroundColor: theme.palette.background.grey_dark
        },
        "& .MuiListItem-root": {
            padding: `0 ${theme.spacing(2)}px`,
            "& a": {
                display: "block",
                lineHeight: `${theme.spacing(4)}px`,
                width: "100%",
                color: theme.palette.tertiary.main
            }
        },
        "& .MuiListItemText-primary": {
            ...theme.typography.h6,
            fontFamily: theme.font.hNeue.regular,
            color: theme.palette.primary.main,
            wordBreak: "break-all"
        },
        "& .MuiListItemText-secondary": {
            ...theme.typography.body1,
            fontFamily: theme.font.hNeue.regular,
            color: theme.palette.primary.main,
            wordBreak: "break-all"
        }
    },
    avatarIcon: {
        width: theme.spacing(7.5),
        height: theme.spacing(7.5),
        marginRight: theme.spacing(2),
    },
    profileIcon: {
        position: "relative",
        fontSize: "4.25rem",
        color: theme.palette.tertiary.main,
        top: "6px"
    },
    noDecoration: {
        textDecoration: "none"
    }
}));
