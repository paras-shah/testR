import { withStyles } from "@material-ui/styles";
//SVG
import memorySvg from "../../images/icons/memory.svg";
import cpuSvg from "../../images/icons/cpu.svg";
import diskSvg from "../../images/icons/disk.svg";
import vmsSvg from "../../images/icons/vms.svg";
import bookmarkSvg from "../../images/icons/ribbon.svg";

export default withStyles(theme => ({
    loaderIcon: {
        color: theme.palette.tertiary.main,
        margin: "100px auto"
    },
    labBlock: {
        position: "relative",
        "& .labHoverSection": {
            position: "absolute",
            backgroundColor: theme.palette.primary.main,
            width: `calc(100% - ${theme.spacing(4)}px)`,
            height: `calc(100% - ${theme.spacing(4)}px)`,
            top: theme.spacing(2),
            borderRadius: theme.spacing(1),
            opacity: 0.9,
            zIndex: 1,
            display: "none",
            textAlign: "center"
        },
        "&:hover .labHoverSection": {
            display: "block"
        }
    },

    createLabButton: {
        "&.MuiButton-contained": {
            width: "40%",
            margin: "0 auto",
            top: `calc(50% - ${theme.spacing(3)}px)`
        }
    },

    labDetailLink: {
        position: "absolute",
        zIndex: 2,
        top: theme.spacing(2.5),
        right: theme.spacing(2),
        color: theme.palette.primary.contrastText,
        textDecoration: "underline",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        "& img": {
            width: "14px",
            height: "13px",
            position: "relative",
            right: theme.spacing(0.5),
            top: theme.spacing(0.5)
        }
    },

    bookmark: {
        "&:after": {
            backgroundSize: "cover",
            backgroundImage: `url(${bookmarkSvg})`,
            backgroundRepeat: "no-repeat",
            content: "''",
            display: "inline-block",
            width: "22px",
            height: "29px",
            marginRight: theme.spacing(1.5),
            position: "absolute",
            top: theme.spacing(1.5),
            right: theme.spacing(1.5)
        }
    },
    // lab block 
    widgetHeader: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: 0
    },

    labWidgetHeader: {
        display: "flex",
        flexDirection: "row",
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        paddingLeft: theme.spacing(1),
        justifyContent: "flex-start",
        position: "relative",
        minHeight: theme.spacing(5),
        "& .MuiListItem-root": {
            padding: 0
        }
    },
    labWidgetHeaderImage:{
        width: "16%",
        marginRight: "4%",
        "& img":{
            height: "auto",
        }
    },
    textSecondary: {
        textTransform: "capitalize",
        color: theme.palette.secondary.main,
        paddingLeft: theme.spacing(1)
    },
    labWidgetHeaderText: {
        width: "80%",// "70%" created time 
        marginTop: theme.spacing(0.5),
        "& h5": {
            textTransform: "uppercase",
            color: theme.palette.secondary.main,
            wordBreak: "break-all",
            paddingBottom: theme.spacing(0.5),
        },
        "& p": {
            width: "95%",
            minHeight: "60px"
        },
        ".createLab & h5": {
            marginTop: "20px"
        }
    },
    labWidgetHeaderDetails: {
        width: "30%",
        padding: 0
    },
    labDetailBlock: {
        marginBottom: 0,
        position: "relative",
        backgroundColor: theme.palette.background.grey_light,
        borderRadius: theme.spacing(1),
        boxShadow: theme.customShadows.widgetBasic,
    },
    // Lab Specs on Lab Templates
    labItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(2),
        position: "relative",
        padding: theme.spacing(3),
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(3, 2),
        },
        
        "&:after": {
            content: "''",
            position: "absolute",
            height: "80%",
            borderLeft: `solid 2px ${theme.palette.background.grey_dark}`,
            top: "15%",
            right: 0
        },
        "&:last-child:after": {
            display: "none"
        }
    },
    labItemImage: {
        marginBottom: theme.spacing(1.5),
        width: "60%",
        minHeight: "60%",
        position: "relative",
        textIndent: "9999px",
        "&.memory": {
            width: "50%",
        },
        "&:before": {
            backgroundImage: `url(${diskSvg})`,
            backgroundRepeat: "no-repeat",
            content: "''",
            display: "inline-block",
            width: "100%",
            height: "100%",
            backgroundPosition: "center",
            backgroundSize: "contain",
            position: "absolute",
            left:0,
        },
        "&.cpu:before": {
            backgroundImage: `url(${cpuSvg})`,
        },
        "&.memory:before": {
            backgroundImage: `url(${memorySvg})`,
        },
        "&.vms:before": {
            backgroundImage: `url(${vmsSvg})`,
        }
    },
    labVersionItem: {
        textTransform: "capitalize",
        color: theme.palette.secondary.main
    },

    // Create a Lab
    createLabModel: {
        "& .MuiDialog-paperWidthMd": {
            width: "734px",
            margin: 0,
            padding: theme.spacing(3),
            borderRadius: theme.spacing(1)
        },
        "& .MuiDialogTitle-root": {
            padding: 0
        },
        "& .MuiSvgIcon-root": {
            color: theme.palette.tertiary.main
        }
    },
    loader: {
        marginLeft: theme.spacing(4),
        color: theme.palette.tertiary.main
    },
}));
