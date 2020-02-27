import tinycolor from "tinycolor2";

// Color Scheme
const primary = "#012947";// navy blue 
const secondary = "#001A2E";// dark blue
const tertiary = "#019DAC";//sea blue
const quaternary = "#8AB7D9";// blue
const quinary = "#787575";
const senary = "#FAFAFA";
const septenary = "#F76A6A";//notification
const octonary = "#F0F0F0";//background
// const nonary = "";
// const denary = "";

const activeLabColor = "#379B4A";
const processingLabColor = septenary; //"#CBCB42";
const expiredLabColor = "#be3535";

const blueShadeOne = "#0C4C7C";
const blueShadeTwo = "#2686C9";
const blueShadeThree = "#8ECBF5";
const blueShadeFour = "#E1F3FF";
const blueShadeFive = "#E7F4FE";
const blueShadeSix = "#F6FBFF";

const warning = septenary;
// previously used
const success = "#7da453";
const info = "#9013FE";

const lightenRate = 7.5;
const darkenRate = 15;

const backgroundPrimary = tertiary;
const backgroundSecondary = senary; //FAFAFA , FBFBFB
const backgroundTertiary = octonary; //F0F0F0
const backgroundModal = getShades(primary, "0.9");
const backgroundTooltip = getShades(secondary, "0.9");

const disabledPrimary = getShades(quinary, "0.4");
const disabledSecondary = octonary;
export default {
    palette: {
        primary: {
            main: primary,
            light: getShades(primary, lightenRate),
            dark: getShades(primary, darkenRate),
            contrastText: "white"
        },
        secondary: {
            main: secondary,
            light: getShades(secondary, lightenRate),
            dark: getShades(secondary, darkenRate),
            contrastText: quinary
        },
        tertiary: {
            main: tertiary,
            light: getShades(tertiary, lightenRate),
            dark: getShades(tertiary, darkenRate),
            contrastText: "white"
        },
        quaternary: {
            main: quaternary,
            light: getShades(quaternary, lightenRate),
            dark: getShades(quaternary, darkenRate),
            contrastText: "white"
        },
        quinary: {
            main: quinary,
            light: getShades(quinary, lightenRate),
            dark: getShades(quinary, darkenRate),
        },
        warning: {
            main: warning,
            light: getShades(warning, lightenRate),
            dark: getShades(warning, darkenRate),
        },
        success: {
            main: success,
            light: getShades(success, lightenRate),
            dark: getShades(success, darkenRate),
        },
        info: {
            main: info,
            light: getShades(info, lightenRate),
            dark: getShades(info, darkenRate),
       },
        text: {
            main: quinary,
            hint: quinary,
            tooltip: backgroundTooltip,
            error: expiredLabColor
        },
        link: {
            main: primary,
            light: getShades(primary, lightenRate),
            tertiary: tertiary
        },
        background: {
            default: backgroundPrimary,
            grey_light: backgroundSecondary,
            grey_dark: backgroundTertiary,
            none: "white",
            modal: backgroundModal,
            dark: primary,

            tableHeading: blueShadeOne,
            tableRowEven: blueShadeSix,
            tableRow: blueShadeFour,

            tableShadeTwo: blueShadeTwo,
            tableShadeThree: blueShadeThree,
            tab: blueShadeFive
        },
        disabled: {
            default: disabledPrimary,
            light: disabledSecondary
        },
        lab: {
            processing: processingLabColor,
            ready: activeLabColor,
            expired: expiredLabColor
        }
    },
    sideBarDivider: "#D8D8D880",
    customShadows: {
        widget:
            `0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A`,
        widgetDark:
            `0px 3px 18px 0px ${getShades(quinary, lightenRate)}, 0 3px 3px -2px ${getShades(quinary, lightenRate)}, 0 1px 8px 0 ${quinary}`,
        widgetWide:
            `0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A`,
        widgetBasic: `0 1px 4px 1px rgba(110,110,110,0.3)`
    },
    overrides: {
        MuiBackdrop: {
            root: {
                backgroundColor: "red",
            },
        },
        MuiMenu: {
            paper: {
                boxShadow:
                    "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
            },
        },
        MuiSelect: {
            icon: {
                color: "#B9B9B9",
            },
        },
        MuiListItem: {
            root: {
                "&$selected": {
                    backgroundColor: "#F3F5FF !important",
                    "&:focus": {
                        backgroundColor: "#F3F5FF",
                    },
                },
            },
            button: {
                "&:hover, &:focus": {
                    backgroundColor: "#F3F5FF",
                },
            },
        },
        MuiTouchRipple: {
            child: {
                backgroundColor: "white",
            },
        },
        MuiTableRow: {
            root: {
                height: 56,
            },
        },
        MuiTableCell: {
            root: {
                borderBottom: "1px solid rgba(224, 224, 224, .5)",
            },
            head: {
                fontSize: "0.95rem",
            },
            body: {
                fontSize: "0.95rem",
            },
        },
    },
};

// get shades
function getShades(color, rate) {
    return tinycolor(color)
        .lighten(rate)
        .toHexString();
}

