import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
// Material UI
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/styles";

//Custom
import { styles } from "./styles";

// Custom Component
import PageTitle from "../../components/PageTitle/PageTitle";

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        border: `none`,
    }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: "16px auto",
        padding: theme.spacing(1),
        minWidth: "240px"
    }
}))(MuiDialogActions);

function CustomDialog({
    open,
    actions,
    title,
    headerContent,
    cancelLabel,
    handleClose,
    actionLabel,
    handleAction,
    classes,
    content,
    ...props
}) {
    return (
        <>
            <Dialog
                onClose={handleClose}
                aria-labelledby={title}
                open={open}
                maxWidth={props.maxWidth}
                fullScreen={props.fullScreen}
                className={props.className}
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {headerContent && (

                        <PageTitle title={title} buttonType="" />
                    )}
                </DialogTitle>

                <DialogContent
                    className={
                        classes && classes.previewModal
                            ? classnames(classes.previewModal)
                            : ""
                    }
                >
                    {content}
                </DialogContent>

                {actions && (
                    <DialogActions>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Button
                                    classes={{
                                        root: classes.buttonLeft
                                    }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        handleAction();
                                    }}
                                >
                                    {actionLabel}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    classes={{
                                        root: classes.buttonRight
                                    }}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        handleClose();
                                    }}
                                >
                                    {cancelLabel}
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                )}
            </Dialog>
        </>
    );
}

CustomDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    maxWidth: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired
};

CustomDialog.defaultProps = {
    maxWidth: "lg",
    headerContentType: true
};

export default CustomDialog;
