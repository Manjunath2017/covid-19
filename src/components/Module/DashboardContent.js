import React, { Component, Fragment } from "react";
import axios from "axios";
import { CardContent, Typography, Grid } from "@material-ui/core";
import  './style.css';

class DashboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: {
        cases: 0,
        todayCases: 0,
        deaths: 0,
        todayDeaths: 0,
        recovered: 0,
        todayRecovered: 0,
        active: 0
      },
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
          <Grid item xs={12} md={5} sm={7} className="cardBackgroundColor">
            <Typography color="textSecondary"> <span className="blinkBullet" > &#8226; </span> Last updated: {new Date(stateVar.updated).toDateString()}  {new Date(stateVar.updated).toLocaleTimeString()}</Typography>
          </Grid>
        </Grid>
        
        <Grid container justify="center">
          <Grid item xs={12} md={3} sm={3} className="card" >
            <CardContent>
              <Typography>Cases</Typography>
              <Typography variant="h5" component="h2" >
                {stateVar.cases.toLocaleString() }
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={3} sm={3} className="card" >
            <CardContent>
              <Typography >Recovered</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.recovered.toLocaleString()}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={3} sm={3} className="card" >
            <CardContent color="secondary">
              <Typography >Deaths</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.deaths.toLocaleString()}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={3} sm={3} className="card" >
            <CardContent>
              <Typography >Today Cases</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.todayCases.toLocaleString()}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={3} sm={3} className="card" >
            <CardContent>
              <Typography >Today Recovered</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.todayRecovered.toLocaleString()}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={3} sm={3} className="card" >
            <CardContent>
              <Typography >Today Deaths</Typography>
              <Typography variant="h5" component="h2">
                {stateVar.todayDeaths.toLocaleString()}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default DashboardContent;
