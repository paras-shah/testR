import { withStyles } from "@material-ui/styles";
// SVG
import memorySvg from "../../../images/icons/memory.svg";
import cpuSvg from "../../../images/icons/cpu.svg";
import diskSvg from "../../../images/icons/disk.svg";
import vmsSvg from "../../../images/icons/vms.svg";
import helpSvg from "../../../images/icons/question.svg";

export default withStyles(theme => ({
    // Lab Generator - Create Lab Popup Header 
    createLabHeader: {
        display: "flex",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        justifyContent: "flex-start",
        position: "relative",
        minHeight: theme.spacing(7),
        width: "100%",
        "& .MuiListItem-root": {
            padding: 0
        },
        "& h2": {
            textTransform: "uppercase",
            color: theme.palette.secondary.main,
            marginBottom: theme.spacing(2)
        },
        "& h3": {
            // maxHeight: theme.spacing(4),
            color: theme.palette.text.tertiary,
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            // whiteSpace: "nowrap"
        }
    },
    createLabWidgetHeaderImage:{
        width: "16%",
        marginRight: "4%",
        "& img":{
            width: "100%",
        }
    },
    createLabHeaderText: {
        width: "80%"
    },

    // Create Lab Detail
    labDetailBlock: {
        marginBottom: theme.spacing(3),
        position: "relative",
        backgroundColor: theme.palette.background.grey_light,
        borderRadius: theme.spacing(1),
        boxShadow: theme.customShadows.widgetBasic
    },
    // Lab Specs on Lab Generator pop up
    labItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(2.5),
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
            left: 0,
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
        "&.MuiTypography-root": {
            fontFamily: theme.font.hNeue.medium
        }
    },
    labVersionItemType: {
        "&.MuiTypography-root": {
            textTransform: "capitalize",
            fontFamily: theme.font.hNeue.light
        }
    },

    labGeneratorDescription: {
        padding: 0
    },

    detailedDescription: {
        flexDirection: "column"
    },

    createLabButton: {
        "&.MuiButton-contained": {
            width: "auto",
            padding: `0 ${theme.spacing(3)}px`
        }
    },

    helpIcon: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        "&:before": {
            backgroundSize: "cover",
            backgroundImage: `url(${helpSvg})`,
            backgroundRepeat: "no-repeat",
            content: "''",
            display: "inline-block",
            width: theme.spacing(3),
            height: theme.spacing(3),
            position: "absolute",
        },
        position: "relative",
        cursor: "pointer"
    }
}));
