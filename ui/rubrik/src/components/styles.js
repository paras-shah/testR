import { withStyles } from "@material-ui/styles";

export default withStyles(theme => {
    return {
        "@global": {
            "body, .MuiTypography-root, li, .MuiListItem-root": {
                ...theme.typography.body1,
                fontFamily: theme.font.hNeue.light
            },
            "h1, .MuiTypography-h1": {
                ...theme.typography.h1,
                fontFamily: theme.font.hNeue.medium
            },
            "h2, .MuiTypography-h2": {
                ...theme.typography.h2,
                fontWeight: "400",
                fontFamily: theme.font.hNeue.medium
            },
            "h3, .MuiTypography-h3": {
                ...theme.typography.h3,
                fontFamily: theme.font.hNeue.light
            },
            "h4, .MuiTypography-h4": {
                ...theme.typography.h4
            },
            "h5, .MuiTypography-h5": {
                ...theme.typography.h5,
                fontFamily: theme.font.hNeue.medium
            },
            "h6, .MuiTypography-h6": {
                ...theme.typography.h6,
                fontFamily: theme.font.hNeue.light
            },
            ".smallText": {
                ...theme.typography.body2,
                fontFamily: theme.font.hNeue.light
            },
            ".largeText": {
                ...theme.typography.body3,
                fontFamily: theme.font.hNeue.regular
            },
            a: {
                textDecoration: "none",
                color: theme.palette.secondary.main
            },
            table: {
                borderCollapse: "separate",
                borderSpacing: "0 4px",
                marginBottom: theme.spacing(1)
            },
            tr: {
                "&:nth-child(even) td": {
                    backgroundColor: theme.palette.background.tableRowEven,
                },
            },
            "th, td": {
                textAlign: "left",
                padding: "8px 6px 6px 8px",
                ...theme.typography.body1,
                fontFamily: theme.font.hNeue.light,
                "&:first-child": {
                    borderTopLeftRadius: theme.spacing(1),
                    borderBottomLeftRadius: theme.spacing(1),
                },
                "&:last-child": {
                    borderTopRightRadius: theme.spacing(1),
                    borderBottomRightRadius: theme.spacing(1),
                }
            },
            th: {
                backgroundColor: theme.palette.background.tableHeading,
                color: theme.palette.primary.contrastText,
            },
            td: {
                border: "solid 2px #fff",
                borderStyle: "none none solid none",
                backgroundColor: theme.palette.background.tableRow,
                color: theme.palette.quinary.main,
            },
            img: {
                maxWidth: "100%"
            },
            ".hidden": {
                display: "none"
            },

            // Overwrite browser autofill in Chrome
            /* Change Autocomplete styles in Chrome*/
            "input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus,textarea:-webkit-autofill,textarea:-webkit-autofill:hover,textarea:-webkit-autofill:focus,select:-webkit-autofill,select:-webkit-autofill:hover,select:-webkit-autofill:focus": {
                border: "none",
                "-webkit-text-fill-color": theme.palette.primary.contrastText,
                "-webkit-box-shadow": `0 0 0px 1000px ${theme.palette.primary.main} inset`,
                transition: "background-color 5000s ease-in-out 0s",
                ".lightTheme &": {
                    "-webkit-text-fill-color": theme.palette.text.primary,
                    "-webkit-box-shadow": `0 0 0px 1000px ${theme.palette.background.grey_light} inset`
                }
            },

            // Placeholder color 
            "::-webkit-input-placeholder": { /* Edge */
                color: theme.palette.primary.contrastText
            },
            ":-ms-input-placeholder": { /* Internet Explorer 10-11 */
                color: theme.palette.primary.contrastText
            },
            "::placeholder": {
                color: theme.palette.primary.contrastText
            },

            //Scrollbars
            /* width */
            "::-webkit-scrollbar": {
                width: theme.spacing(0.5)
            },
            /* Track */
            "::-webkit-scrollbar-track": {
                background: theme.palette.background.grey_dark
            },
            /* Handle */
            "::-webkit-scrollbar-thumb": {
                background: theme.palette.tertiary.main
            },
            "::-webkit-scrollbar-thumb:hover": {
                background: theme.palette.tertiary.light
            },
            //animations
            "@keyframes blink": {
                "0%": {
                    opacity: 1
                },
                "20%": {
                    opacity: 0.8
                },
                "40%": {
                    opacity: 0.6
                },
                "60%": {
                    opacity: 0.4
                },
                "80%": {
                    opacity: 0.2
                },
                "100%": {
                    opacity: 0
                }
            },
            // Overwrite Material ui
            // Button
            ".MuiButton-contained": {
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
                },
                "&.MuiButton-sizeSmall": {
                    fontSize: 12,
                    lineHeight: `${theme.spacing(4)}px`,
                }
            },
            ".MuiPaper-elevation": {
                borderRadius: 10,
                boxShadow: "0 1px 4px 1px rgba(110,110,110,0.3)"
            },
            // outlined
            ".MuiButton-outlinedPrimary": {
                borderRadius: 6,
                color: theme.palette.tertiary.main,
                borderColor: theme.palette.tertiary.main,
                backgroundColor: theme.palette.tertiary.contrastText,
                textTransform: "uppercase",
                "&:hover": {
                    color: theme.palette.tertiary.dark,
                    backgroundColor: theme.palette.tertiary.contrastText,
                    borderColor: theme.palette.tertiary.dark
                }
            },

            // Header
            ".MuiToolbar-regular": {
                minHeight: theme.breakpoints.values.appBarHeight,
                [theme.breakpoints.down("sm")]: {
                    minHeight: theme.breakpoints.values.appBarHeightMobile,
                }
            },
            //input
            ".MuiInputBase-root": {
                color: theme.palette.primary.contrastText,
                "& fieldset": {
                    borderRadius: theme.spacing(0.75),
                    border: `solid 1px ${theme.palette.tertiary.main}`
                },
                "&.Mui-disabled fieldset": {
                    border: `solid 1px ${theme.palette.disabled.default}`
                },
                "& input": {
                    fontFamily: theme.font.hNeue.light,
                    fontSize: "0.875rem", //14
                    lineHeight: "40px",
                    height: theme.spacing(3.75),
                    padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(3)}px`,
                }
            },
            ".MuiTextField-root": {
                "&.lightTheme": {
                    "& .MuiFormLabel-root": {
                        color: theme.palette.text.primary,
                        background: theme.palette.background.grey_light,
                        "&.Mui-focused, &.MuiFormLabel-filled": {
                            color: theme.palette.text.primary
                        }
                    },
                    "& .MuiInputBase-input ": {
                        color: theme.palette.text.primary,
                        background: theme.palette.background.grey_light
                    }
                },
                margin: 0,
                marginBottom: theme.spacing(4.5),
                width: "100%",
                "&.lastTextField": {
                    marginBottom: theme.spacing(1.5)
                },
                "& input:valid + fieldset": {
                    color: theme.palette.primary.contrastText
                },
                "& input:invalid + fieldset": {
                    // borderColor: "red"
                },
                "& input": {
                    fontSize: 14,
                    lineHeight: `${theme.spacing(6)}px`,
                    padding: 0,
                    paddingLeft: "20px",
                    paddingRight: "20px"
                },
                "& .MuiInputBase-root": {
                    borderRadius: theme.spacing(0.5),
                    height: theme.spacing(6.25)
                },
                "& .MuiFormLabel-root": {
                    color: theme.palette.primary.contrastText,
                    background: theme.palette.primary.main,
                    fontFamily: theme.font.hNeue.light,
                    fontSize: 14,
                    "&.Mui-focused, &.MuiFormLabel-filled": {
                        fontSize: 20,
                        color: theme.palette.primary.contrastText,
                        padding: "0 5px"
                    }
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.tertiary.main
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.tertiary.main
                },
                "& .MuiButtonBase-root": {
                    color: theme.palette.tertiary.main
                }
            },
            // Select
            ".MuiSelect-select": {
                ".pageSelect &": {
                    color: theme.palette.text.primary
                },
                color: theme.palette.primary.contrastText,
                borderRadius: theme.spacing(0.75),
                border: `solid 1px ${theme.palette.tertiary.main}`,
                ".Mui-disabled &": {
                    color: theme.palette.disabled.default,
                    borderColor: theme.palette.disabled.default
                },
                "&:focus": {
                    borderRadius: theme.spacing(0.75)
                }
            },
            ".MuiSelect-icon": {
                color: theme.palette.tertiary.main,
                ".MuiInputBase-root.Mui-disabled &": {
                    color: theme.palette.disabled.default
                }
            },
            ".MuiPopover-root": {
                "& .MuiPaper-root": {
                    marginTop: "46px",
                    borderRadius: "0 0 6px 6px"
                },
                "& .MuiMenu-list": {
                    maxHeight: "200px"
                }
            },
            //Pop UP Overlay
            ".MuiBackdrop-root": {
                backgroundColor: theme.palette.background.modal
            },
            // Accordion
            ".MuiExpansionPanel-root": {
                boxShadow: "none",
                margin: 0,
                padding: 0
            },
            ".MuiExpansionPanelSummary-root": {
                "&.Mui-expanded": {
                    minHeight: theme.spacing(6)
                },
                backgroundColor: theme.palette.background.tab,
                borderRadius: theme.spacing(0.5)
            },
            ".MuiExpansionPanelSummary-content": {
                "&.Mui-expanded": {
                    margin: 0
                },
                "& h5": {
                    fontFamily: theme.font.hNeue.regular,
                    lineHeight: `${theme.spacing(3)}px`,
                    color: theme.palette.secondary.main,
                    letterSpacing: "0.8px"
                }
            },
            ".MuiCollapse-wrapper": {
                backgroundColor: theme.palette.background.grey_light,
                paddingTop: theme.spacing(3),
                borderRadius: `0 0 ${theme.spacing(0.5)}px ${theme.spacing(
                    0.5
                )}px`
            },
            //Tab
            ".MuiTabs-flexContainer .MuiTab-root": {
                backgroundColor: theme.palette.quaternary.main,
                "&.Mui-selected": {
                    backgroundColor: theme.palette.background.tableHeading
                },
                borderRadius: `5px 5px 0 0`,
                color: "white",
            },
            ".MuiTabs-root .MuiTabs-indicator":{
                backgroundColor: theme.palette.tertiary.main,
                height: theme.spacing(0.5)
            },
            ".MuiTypography-root .MuiBox-root":{
                padding: `${theme.spacing(3)}px ${theme.spacing(1)}px`   
            }
        }
    };
});
