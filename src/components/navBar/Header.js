import React, { Component, Fragment } from "react"; 

import { 
  Typography,
  AppBar,
  Toolbar
} from "@material-ui/core";
 


class Header extends Component {
  render() {
    return (
      <Fragment>
         <AppBar position="static" >
          <Toolbar>
            <Typography variant="h5" style={{ "margin": "0 auto"}}>
              Worldwide Covid-19 statistic by <b style={{ "color": "#ff2"}}>Manjunath Jadhav </b>
            </Typography>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

export default Header;
