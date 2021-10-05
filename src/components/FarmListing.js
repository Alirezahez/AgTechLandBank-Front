import React from "react";
import { connect } from "react-redux";

import {
    createMuiTheme,
    makeStyles,
    withStyles,
} from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import * as actions from "./../actions/actionCreators";
import { props } from "bluebird";
import { green, brown } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "& .MuiTextField-root .MuiAccordionSummary-content": {
            margin: theme.spacing(2),
            width: "25ch",
        },
        margin: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const Accordion = withStyles({
    root: {
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
        "&:not(:last-child)": {
            borderBottom: 0,
        },
        "&:before": {
            display: "none",
        },
        "&$expanded": {
            margin: "auto",
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56,
        },
    },
    content: {
        "&$expanded": {
            margin: "12px 0",
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const FarmListing = (props) => {
    const [expanded, setExpanded] = React.useState("panel0");

    const [stockValues, setStockValues] = React.useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setStockValues(value);
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const classes = useStyles();

    const formatMoney = (money) => {
        return parseFloat(money).toFixed(2);
    };
    const formatPercentage = (percentage) => {
        return parseFloat(percentage).toFixed(1);
    };

    const handleBuy = (amount) => {
        props.buyStock({ ...props.ownedProperty }, amount);
    };
    const handleSell = (amount) => {
        props.sellStock({ ...props.ownedProperty }, amount);
    };
    return (
        <div className={classes.root}>
            <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
            >
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >
                    <Grid container alignContent="center" alignItems="center">
                        <Grid item xs={12} sm={5}>
                            <h1 className={""}>
                                {props.ownedProperty.address}
                            </h1>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <h2>
                                {formatMoney(props.ownedProperty.totalWorth)}C
                            </h2>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            {formatMoney(props.ownedProperty.stock)}
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            {formatPercentage(
                                props.ownedProperty.investmentReturn
                            )}
                            %
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            {formatMoney(props.ownedProperty.currentPrice)}C
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            {/* Propably will change this using material UI styles */}
                            <div
                                style={{
                                    backgroundImage:
                                        "url(" + props.ownedProperty.img + ")",
                                    width: "100%",
                                    height: "100%",
                                }}
                            ></div>
                            {/* <img
                                width="100%"
                                src={props.ownedProperty.img}
                                alt="farm"
                            /> */}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <form
                                className={classes.root}
                                noValidate
                                autoComplete="off"
                            >
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-number"
                                            fullWidth
                                            label="Number"
                                            type="number"
                                            variant="outlined"
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="outlined"
                                            className={classes.button}
                                            fullWidth
                                            onClick={() => {
                                                handleBuy(stockValues);
                                            }}
                                            color="primary"
                                        >
                                            <h3>BUY</h3>
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            className={classes.button}
                                            fullWidth
                                            onClick={() => {
                                                handleSell(stockValues);
                                            }}
                                            color="primary"
                                        >
                                            <h3>Sell</h3>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

const mapActionsToProps = (dispatch) => {
    return {
        buyStock: actions.buyStock(dispatch),
        sellStock: actions.sellStock(dispatch),
    };
};

export default connect(null, mapActionsToProps)(FarmListing);
