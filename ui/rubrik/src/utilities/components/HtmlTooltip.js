import { withStyles } from "@material-ui/styles";
import Tooltip from "@material-ui/core/Tooltip";

/* 
  Component - Tooltip styling 
  Type: HOC
*/
export const ToolTipStyle = withStyles(theme => ({
  tooltip: {
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(14),
    border: `2px solid ${theme.palette.tertiary.main}`
  }
}));

/* 
  Component - HtmlTooltip
  Type: Class Component 
*/
const HtmlTooltip = ToolTipStyle(Tooltip);

export default HtmlTooltip;