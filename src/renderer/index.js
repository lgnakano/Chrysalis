// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import ReactDOM from "react-dom";
import Electron from "electron";
import { SnackbarProvider } from "notistack";

import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import App from "./App";
import Error from "./Error";
import "../styles/keymap.css";

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
};

try {
  ReactDOM.render(
    <SnackbarProvider
      ref={notistackRef}
      action={key => (
        <IconButton color="inherit" size="small" onClick={onClickDismiss(key)}>
          <CloseIcon />
        </IconButton>
      )}
      maxSnack={4}
      autoHideDuration={null}
    >
      <App />
    </SnackbarProvider>,
    document.getElementById("app")
  );
} catch (e) {
  Electron.remote.getCurrentWebContents().openDevTools();
  ReactDOM.render(<Error error={e} />, document.getElementById("app"));
}
