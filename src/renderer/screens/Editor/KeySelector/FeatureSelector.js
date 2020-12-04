// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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

import Divider from "@material-ui/core/Divider";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";

import LayerSwitch from "./Features/LayerSwitch";
import CategorySelector from "./CategorySelector";

import { NewKeymapDB } from "../../../../api/keymap";

const db = new NewKeymapDB();

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit
  },
  divider: {
    marginTop: theme.spacing.unit
  }
});

const FeaturePanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" id={`featurepanel-${index}`} {...other}>
      {value === index && children}
    </div>
  );
};

class FeatureSelector extends React.Component {
  tabs = {
    layer: 0,
    macros: 1,
    tapdance: 2,
    leader: 3,
    ledkeys: 4,
    spacecadet: 5,
    steno: 6
  };

  state = {
    tab: 0
  };

  onTabChange = (_, tab) => {
    this.setState({ tab: tab });
  };

  tabForKey = key => {
    let newTab = 0;

    for (const cat of Object.keys(this.tabs)) {
      if (db.isInCategory(key, cat)) {
        newTab = this.tabs[cat];
      }
    }

    return newTab;
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    this.setState({ tab: this.tabForKey(nextProps.currentKeyCode) });
  };

  componentDidMount() {
    this.setState({ tab: this.tabForKey(this.props.currentKeyCode) });
  }

  render() {
    const { classes, currentKeyCode, onKeySelect } = this.props;
    const { tab } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={tab}
          variant="scrollable"
          scrollButtons="auto"
          onChange={this.onTabChange}
        >
          <Tab label="Layer switch" />
          <Tab label="Macro" />
          <Tab label="TapDance" />
          <Tab label="Leader" />
          <Tab label="LEDs" />
          <Tab label="SpaceCadet" />
          <Tab label="Steno" />
        </Tabs>

        <Divider className={classes.divider} />

        <FeaturePanel value={tab} index={0}>
          <LayerSwitch keyCode={currentKeyCode} onKeySelect={onKeySelect} />
        </FeaturePanel>
        <FeaturePanel value={tab} index={1}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="macros"
            variant="number"
            name="Macro"
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={2}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="tapdance"
            variant="number"
            name="TapDance"
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={3}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="leader"
            variant="number"
            name="Leader"
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={4}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="ledkeys"
            variant="button-grid"
            name="LEDs"
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={5}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="spacecadet"
            variant="button-grid"
            name="SpaceCadet"
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={6}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="steno"
            variant="button-grid"
            name="Steno"
          />
        </FeaturePanel>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FeatureSelector);