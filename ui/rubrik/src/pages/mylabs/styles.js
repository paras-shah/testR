import { withStyles } from "@material-ui/styles";
//SVG
import logoSvg from "../../images/icons/rubrik-logo.svg";
import createdSvg from "../../images/icons/calendar-plus.svg";
import startedSvg from "../../images/icons/calendar-start.svg";
import endedSvg from "../../images/icons/calendar-end.svg";
import remainingTimeSvg from "../../images/icons/hour-glass.svg";

import previewSvg from "../../images/icons//preview.svg";
import previewFilledSvg from "../../images/icons/preview-filled.svg";
import deleteSvg from "../../images/icons/delete.svg";
import deleteFilledSvg from "../../images/icons/delete-filled.svg";

export default withStyles(theme => {
    return {
        loaderIcon: {
            color: theme.palette.tertiary.main,
            margin: "100px auto"
        },
        // my lab block
        labInstanceBlock: {
            display: "block"
        },

        widgetHeader: {
            padding: theme.spacing(1),
        },

        labWidgetHeader: {
            ".initial &:before, .processing &:before": {
                animation: "blink 1s",
                "animation-iteration-count": "infinite",
                "animation-direction": "alternate-reverse"
            },
            display: "flex",
            flexDirection: "row",
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5),
            paddingLeft: theme.spacing(1),
            justifyContent: "flex-start",
            position: "relative",
            minHeight: theme.spacing(5),
            width: "100%",
            "& .MuiListItem-root": {
                padding: 0
            }
        },
        labInstanceHeaderImage: {
            width: "11%",
            marginRight: "4%",
            "& img": {
                height: "auto",
            }
        },
        textSecondary: {
            textTransform: "capitalize",
            color: theme.palette.secondary.main,
            paddingLeft: theme.spacing(1)
        },
        labWidgetHeaderText: {
            width: "70%",
            marginTop: theme.spacing(0.5),
            "& h5": {
                textTransform: "uppercase",
                color: theme.palette.secondary.main,
                wordBreak: "break-all",
                paddingBottom: theme.spacing(0.5),
                position: "relative",
                textIndent: "15px"
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
            width: "15%",
            padding: 0,
        },
        labOptions: {
            padding: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "50%",
        },
        labOptionsItem: {
            width: "50%",
            "& a, & button": {
                width: "100%",
                height: "100%",
                display: "block",
                position: "relative",
                textIndent: "-9999px",
                background: "none",
                border: "none",
                "&:before": {
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    content: "''",
                    display: "inline-block",
                    width: "100%",
                    height: "100%",
                    backgroundPosition: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }
            }
        },
        launchButton: {
            marginRight: theme.spacing(0.5),
            "&:before": {
                backgroundImage: `url(${previewSvg})`
            },
            "&.disabled:before": {
                opacity: 0.3,
                cursor: "default",
                backgroundImage: `url(${previewSvg})`
            },
            "&:hover:before": {
                backgroundImage: `url(${previewFilledSvg})`
            },
            "&.disabled:hover:before": {
                backgroundImage: `url(${previewSvg})`
            },
        },
        deleteButton: {
            margin: theme.spacing(1),
            cursor: "pointer",
            "&:before": {
                backgroundImage: `url(${deleteSvg})`,
            },
            "&.disabled:before": {
                opacity: 0.5,
                cursor: "default"
            },
            "&:hover:before": {
                backgroundImage: `url(${deleteFilledSvg})`
            },
        },

        // Lab Specs on Lab Templates
        widgetLabInstanceDetail: {
            position: "relative",
            "& .labHoverSection": {
                position: "absolute",
                backgroundColor: theme.palette.primary.main,
                width: "100%",
                height: "100%",
                top: theme.spacing(0),
                borderRadius: theme.spacing(1),
                opacity: 0.80,
                zIndex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            },
            ".ready & .labHoverSection": {
                display: "none"
            },
        },

        labStatusButton: {
            "&.MuiButton-contained": {
                width: "auto",
                padding: "0 20px"
            }
        },

        labDetailBlock: {
            marginBottom: theme.spacing(4),
            position: "relative",
            backgroundColor: theme.palette.background.grey_light,
            borderRadius: theme.spacing(1),
            boxShadow: theme.customShadows.widgetBasic,
        },
        labItem: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing(2),
            position: "relative",
            padding: theme.spacing(3),
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
            minHeight: "50%",
            position: "relative",
            textIndent: "9999px",
            "&:before": {
                backgroundImage: `url(${startedSvg})`,
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
            "&.end:before": {
                backgroundImage: `url(${endedSvg})`
            },
            "&.created:before": {
                backgroundImage: `url(${createdSvg})`
            },
            "&.time.remaining:before": {
                backgroundImage: `url(${remainingTimeSvg})`,
            }
        },
        labVersionItem: {
            textTransform: "capitalize",
            color: theme.palette.secondary.main
        },
        // Status
        myLabHeaderIcon: {
            position: "absolute",
            top: "4px",
            left: "0px",
            width: "10px",
            height: "10px",
            borderRadius: "5px",
            content: "''",
            display: "block",

            ".initial &, .processing &": {
                animation: "blink 1s",
                "animation-iteration-count": "infinite",
                backgroundColor: theme.palette.lab.processing,
                "animation-direction": "alternate-reverse"
            },
            ".ready &": {
                backgroundColor: theme.palette.lab.ready
            },
            ".processingfailed &": {
                backgroundColor: theme.palette.lab.expired
            }
        },
        // Lab Services
        labServicesBlock: {
            marginBottom: theme.spacing(2),
            position: "relative",
        },
        endpointHeader: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        allServiceLink: {
            marginBottom: theme.spacing(1),
            "&:hover": {
                textDecoration: "underline",
                color: theme.palette.background.tableShadeThree,
                cursor: "pointer"
            }
        },
        endPointDetails: {
            minHeight: "140px",

            "& table": {
                width: "100%",
                tableLayout: "fixed",
                "& th hr": {
                    width: "50%",
                    float: "left",
                    borderWidth: theme.spacing(0.05),
                    borderColor: theme.palette.primary.contrastText,
                },
                "& th span": {
                    display: "block",
                    clear: "both"
                },
                "& td hr": {
                    width: "50%",
                    float: "left",
                    borderWidth: theme.spacing(0.05),
                    borderColor: 'lightgray',
                },
                "& td p": {
                    width: "90%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    "& span:hover": {
                        backgroundColor: theme.palette.background.tableShadeThree,
                    }
                },
                "& i": {
                    color: theme.palette.tertiary.main,
                    fontSize: theme.spacing(3)
                }
            }
        },
        serviceActionsHeader: {

        },
        actionHeader: {
            marginBottom: theme.spacing(2),
        },
        labActionList: {
            listStyle: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            margin: "0px",
            marginBottom: theme.spacing(4),
            padding: "0px",
            "& li": {
                marginRight: theme.spacing(4),
                marginBottom: theme.spacing(2),
            },
            "& button": {
                padding: "5px 20px",
                boxShadow: theme.customShadows.widget,
                textTransform: "capitalize",
                "&:active": {
                    boxShadow: theme.customShadows.widgetWide
                }
            }
        },
        resourceActionList: {
            border: "1px",
            marginBottom: theme.spacing(0),
            "& li": {
                marginRight: theme.spacing(2),
            },
            "& button": {
                padding: "0px 20px",
                textTransform: "capitalize"
            }
        },
        performActionText: {
            marginBottom: theme.spacing(3),
        },
        actionBox: {
            "& .MuiButton-contained": {
                marginBottom: theme.spacing(4),
            }
        },

        linkText: {
            display: "inline-block",
            cursor: "pointer",
            marginRight: theme.spacing(1.5),
            textDecoration: "underline",
            color: theme.palette.quinary.main,
            "&:hover": {
                color: theme.palette.quinary.light,
            }
        },
        linkProtocol: {
            position: "relative",
            color: theme.palette.link.tertiary
        },
        openInNewIcon: {
            width: "14px"
        },
        // Delete Pop up
        deleteInstanceWidgetHeader: {
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
            display: "flex",
            flexDirection: "row",
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(4.4),
            paddingLeft: theme.spacing(6),
            justifyContent: "flex-start",
            position: "relative",
            minHeight: theme.spacing(5),
            width: "100%",
            minWidth: "400px",
            "& .MuiListItem-root": {
                padding: 0
            }
        },
        deleteInstanceWidgetHeaderText: {
            width: "70%",
            marginTop: theme.spacing(0.5),
            "& h5": {
                textTransform: "uppercase",
                color: theme.palette.secondary.main
            },
        },
        deleteInstanceWidgetHeaderDetails: {
            width: "30%",
            padding: 0
        },
        deleteConfirmationBox: {
            textAlign: "left",
            color: theme.palette.text.main
        },

        buttonLeft: {
            marginRight: "25px"
        },
        buttonRight: {
            marginRight: "25px"
        }
    };
});
