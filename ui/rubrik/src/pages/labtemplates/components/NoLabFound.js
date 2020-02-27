import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

// Material UI
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

// Config
import { PAGE_LANDING_URL, LOCAL_STORAGE} from "../../../apis/config";

//  Custom
// Copy
import { COPY_COMMON } from "../../../copy/common";
import { Typography } from "../../../components/Wrappers/Wrappers";

//SVG
import notFoundSvg from "../../../images/icons/cloud-notify.svg";


const NoLabFound = props => {
    const { classes } = props;
    const vduId = localStorage.getItem(
        LOCAL_STORAGE.SELECTED_VDU
    );
    return (
        <Grid container direction="row" justify="center">
            <Grid item xs={12} md={6}>
                <Box
                    component="div"
                    className={classnames(
                        classes.messageContainer,
                        classes.labNotFound
                    )}
                >
                    <p className="largeText">{COPY_COMMON.NO_RESULT}</p>

                    <Typography variant="h6" component="p">
                        {COPY_COMMON.NO_RESULT_DETAIL}
                    </Typography>

                    <Link to={PAGE_LANDING_URL + `/${vduId}`} onClick={() => {
                        props.emptySearch("")
                    }}>
                        <Button
                            classes={{
                                root: classes.backButton
                            }}
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            {COPY_COMMON.BACK_TO}
                        </Button>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
};

NoLabFound.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(theme => ({
    // No lab found
    messageContainer: {
        "&:before": {
            backgroundSize: "cover",
            backgroundImage: `url(${notFoundSvg})`,
            backgroundRepeat: "no-repeat",
            content: "''",
            display: "inline-block",
            marginBottom: theme.spacing(2),
            width: theme.spacing(22.25),
            height: theme.spacing(22.25)
        },
        "& .largeText": {
            marginTop: 0,
            marginBottom: 0,
            color: theme.palette.secondary.main
        },
        "& p": {
            color: theme.palette.secondary.main,
            marginBottom: theme.spacing(8)
        },

        minHeight: "458px",
        width: "100%",
        borderRadius: theme.spacing(1.5),
        boxShadow: "0 1px 4px 1px rgba(0,0,0,0.05)",
        textAlign: "center",
        marginBottom: "100px",
        padding: theme.spacing(4.5)
    },
    backButton: {
        "&.MuiButton-contained": {
            width: "40%",
            margin: "0 auto",
            top: `calc(50% - ${theme.spacing(3)}px)`
        }
    }
}))(NoLabFound);
