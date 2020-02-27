import { createMuiTheme } from "@material-ui/core";

import basicTheme from "./basic/defaults";
import overrides from "./basic/overrides";


export default {
    basic: createMuiTheme({
        typography: {
            // Tell Material-UI what the font-size on the html element is.
            htmlFontSize: "14px",
            fontSize: "14px"
        },
        props: {
            // Name of the component
            MuiButtonBase: {
                // The properties to apply
                disableRipple: true // No more ripple, on the whole application!
            }
        },
        font: {
            hNeue: {
                thin: "Arial",
                light: "Arial",//"Helvetica Neue-Light",
                regular: "Helvetica", //"Helvetica Neue-Light",//"Helvetica Neue",
                medium: "Helvetica Neue-Medium",
                bold: "Helvetica Neue-Bold"
            }
        },
        breakpoints: {
            values: {
                xl: 1440,
                lg: 1280,
                md: 960,
                sm: 600,
                maxWidth: 2140,
                appBarHeight: 95,
                appBarHeightMobile: 130,
            }
        },
        ...basicTheme,
        ...overrides // overall overrides
    })
};
