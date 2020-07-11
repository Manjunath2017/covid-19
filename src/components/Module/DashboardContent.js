import React, { Component, Fragment } from "react";
import axios from "axios";
 

import { CardContent, Typography, Grid } from "@material-ui/core";

const card = {
  background: "#ff2",
  borderRadius: "2px",
  display: "inline-block",
  height: "100%",
  margin: "1rem",
  position: "relative",
  width: "100%",
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
};
const cardBackgroundColor = {
  background: "#DDD",
  opacity: "0.3",
  // borderRadius: "2px",
  display: "inline-block",
  height: "100%",
  margin: "1rem",
  position: "relative",
  padding: "5px",
  width: "100%",
  // boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
};

class DashboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get("https://corona.lmao.ninja/v2/all");
    this.setState({ data: res.data });
    this.setState({ loading: false });
    // console.log(res.data);
    // console.log(res.data.cases);
  }

  render() {
    // console.log(this.state.data.cases);
    var stateVar = this.state.data;

    return (
      <Fragment>
        {/* {this.state.loading ? "True" : " False"} */}
        <Grid container justify="center">
          <Grid item xs={12} md={5} sm={7} style={cardBackgroundColor}>
            <Typography color="textSecondary">Last updated: {new Date(stateVar.updated).toDateString()}  {new Date(stateVar.updated).toLocaleTimeString()}</Typography>
          </Grid>
        </Grid>
        
        <Grid container justify="center">
          <Grid item xs={12} md={3} sm={5} style={card}>
            <CardContent>
              <Typography color="textSecondary">Total cases</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.cases}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={3} sm={5} style={card}>
            <CardContent>
              <Typography color="textSecondary">Recovered</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.recovered}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={3} sm={5} style={card}>
            <CardContent color="secondary">
              <Typography color="textSecondary">Deaths</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.deaths}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={3} sm={5} style={card}>
            <CardContent>
              <Typography color="textSecondary">Today Cases</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.todayCases}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={3} sm={5} style={card}>
            <CardContent>
              <Typography color="textSecondary">Today Recovered</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.todayRecovered}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={3} sm={5} style={card}>
            <CardContent>
              <Typography color="textSecondary">Today Deaths</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.todayDeaths}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default DashboardContent;
