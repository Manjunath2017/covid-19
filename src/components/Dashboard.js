import React, { Component, Fragment } from "react";

import { 
  Typography,
  AppBar,
  Toolbar
} from "@material-ui/core";
import Header from './navBar/Header';

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
         <Header />
      </Fragment>
    );
  }
}
export default Dashboard;
