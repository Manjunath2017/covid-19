import React, { Component, Fragment } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Select,
  Typography,
  Grid
} from "@material-ui/core";
import Input from '@material-ui/core/Input';

class DashboardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      filterData: {},
      count: 0,
      countries: []
    };
    this.selectCountry = this.selectCountry.bind(this);
    this.search = this.search.bind(this);

  }
  //get all countries corona cases
  async getCounteriesDetail() {
    //loading set to true till
    this.setState({ loading: true });
    try {
      //make an http call
      const res = await axios.get("https://corona.lmao.ninja/v2/countries");
      // console.log(res);
      //After getting data set the result
      this.setState({ data: res.data });

      const pushCountry = [];
      var count = 0;
      for (var i in this.state.data) {
        // console.log(this.state.data[i].country);
        pushCountry.push({ name: this.state.data[i].country });
        count++;
      }
      this.setState({ count });
      this.setState({ countries: pushCountry });
      //After getting data loading remains false

      this.setState({ loading: false });
      // const {countries} =this.state;
      // console.log(typeof countries, typeof res, res);
    } catch (error) {
      //Set loading to true if response fails
      this.setState({ loading: true });
      console.log(error);
    }
    // console.log(res.data);
    // console.log(res.data.cases);
  }

  async componentDidMount() {
    this.getCounteriesDetail();
    // console.log(this.state.data);
  }

  //Filer ......
  selectCountry(event) {
    // this.setState({select:event.target.value});
    const data = this.state.data;
    // console.log('test handle click!', event.target.value, 'country.countries');
    var count = 0;
    {
      data
        .filter((country) => country.country === event.target.value)
        .map((countryDetail) => {
          // console.log('countryDetail', countryDetail);
          this.setState({ filterData: countryDetail });
          count++;
        });
    }
    if (event.target.value === "reset") {
      count = 2;
      this.setState({ count });
      // console.log(this.state.count);
    }
    this.setState({ count });
    // console.log(typeof this.state.filterData, 'count', count);
  }
    //Search ......
    search(event) {
      
      console.dir('search !', this.countries);
      // this.setState({select:event.target.value});
      const data = this.state.data;

      const Searchvalue= event.target.value.toLowerCase();
      console.dir(Searchvalue, typeof data);
      {
        data
          .filter(country => {
            if(country.country.indexOf(Searchvalue) !== -1){
              console.log(country);
              this.setState({ data: country });
              // console.dir(typeof data);
            }
          })
      }
    }

  render() {
    // console.log('this', this.state.data.);
    const { data, countries, loading, count, filterData } = this.state;
    // console.log(countries);
    return (
      <Fragment>
      <Paper>
      <Grid  container justify="center">
        <Grid item xs={12} md={6} sm={12} className="cardBackgroundColor">
          <Typography color="textSecondary" > Reported Cases and Deaths in {countries.length} Countries  </Typography>
          <form  noValidate autoComplete="off">
            <Input placeholder="Search" onChange={this.search}  />
          </form>
        </Grid>
      </Grid>
        {/* <Typography >  </Typography> */}
        {loading ? (
          <h1> Loading... </h1>
        ) : (
          <TableContainer style={{ display: "block",tableLayout: "fixed", overflow: "scroll", height: "50vh", maxWidth:"95%", margin:"0 auto" }}>
            <Table  >
              <TableHead>
                <TableRow>
                  {/* <TableCell align="right">Flag</TableCell>   */}
                  <TableCell align="left">
                    <Select native onClick={this.selectCountry}  value={this.state.value} >
                      <option value="reset"> Select country or Reset </option>
                      {countries.map((result) => {
                        return (
                          <option value={result.name} key={result.name}>
                            {result.name}
                          </option>
                        );
                      })}
                    </Select>
                  </TableCell>
                  <TableCell align="left">Cases</TableCell>
                  <TableCell align="left">Active</TableCell>
                  <TableCell align="left">Recovered</TableCell>
                  <TableCell align="left">Critical</TableCell>
                  <TableCell align="left">Deaths</TableCell>
                  {/* <TableCell style={{paddingleft:"60px"}} align="left" >Department</TableCell>   */}
                </TableRow>
              </TableHead>
              <TableBody>
                {count >= 2 ? (
                  data.map((result) => {
                    return (
                      <TableRow hover key={result.country}>
                        {/* <TableCell align="left"><img src={result.countryInfo.flag} alt={result.countryinfo.flag} /></TableCell>  */}
                        <TableCell align="left">{result.country.toLocaleString()}</TableCell>
                        <TableCell align="left">{result.cases.toLocaleString()}</TableCell>
                        <TableCell align="left">{result.active.toLocaleString()}</TableCell>
                        <TableCell align="left">{result.recovered.toLocaleString()}</TableCell>
                        <TableCell align="left">{result.critical.toLocaleString()}</TableCell>
                        <TableCell align="left">{result.deaths.toLocaleString()}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    {/* <TableCell align="left"><img src={result.countryInfo.flag} alt={result.countryinfo.flag} /></TableCell>  */}
                    <TableCell align="left">{filterData.country}</TableCell>
                    <TableCell align="left">{filterData.cases}</TableCell>
                    <TableCell align="left">{filterData.active}</TableCell>
                    <TableCell align="left">{filterData.recovered}</TableCell>
                    <TableCell align="left">{filterData.critical}</TableCell>
                    <TableCell align="left">{filterData.deaths}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      </Fragment>
    );
  }
}
export default DashboardTable;
