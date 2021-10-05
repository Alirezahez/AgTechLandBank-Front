import logo from "./logo.svg";
import "./App.css";
import WalletValue from "./components/walletValue";
import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import FarmListings from "./components/FarmListings";

import { green, brown } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[900],
        },
        secondary: {
            main: brown[400],
        },
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <WalletValue />
                <FarmListings />
            </ThemeProvider>
        </div>
    );
}

export default App;
