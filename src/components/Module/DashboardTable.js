import React, { Component, Fragment } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Select,
  Typography,
  Grid,
  Box,
  Avatar
} from "@material-ui/core";
// import Input from '@material-ui/core/Input';

class DashboardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      filterData: {
        country:0,
        cases:0,
        todayCases:0,
        active:0,
        recovered:0,
        todayRecovered:0,
        critical:0,
        deaths:0,
        todayDeaths:0
      },
      count: 0,
      countries: []
    };
    this.selectCountry = this.selectCountry.bind(this);
    // this.search = this.search.bind(this);
  }
  //get all countries corona cases
  async getCounteriesDetail() {
    //loading set to true till
    this.setState({ loading: true });
    try {
      //make an http call
      const res = await axios.get("https://corona.lmao.ninja/v2/countries");
      console.log(res.data[0].countryInfo);
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
      data
        .filter((country) => country.country === event.target.value)
        .map((countryDetail) => {
          // console.log('countryDetail', countryDetail);
          count++;
        return this.setState({ filterData: countryDetail });
        });

    if (event.target.value === "reset") {
      count = 2;
      this.setState({ count });
      // console.log(this.state.count);
    }
    this.setState({ count });
    // console.log(typeof this.state.filterData, 'count', count);
  }
    // //Search ......
    // search(event) {
      
    //   console.dir('search !', this.countries);
    //   // this.setState({select:event.target.value});
    //   const data = this.state.data;

    //   const Searchvalue= event.target.value.toLowerCase();
    //   console.dir(Searchvalue, typeof data);
    //   {
    //     data
    //       .filter(country => {
    //         if(country.country.indexOf(Searchvalue) !== -1){
    //           console.log(country);
    //           this.setState({ data: country });
    //           // console.dir(typeof data);
    //         }
    //       })
    //   }
    // }

  render() {
    // console.log('this', this.state.data.);
    const { data, countries, loading, count, filterData } = this.state;
    // console.log(countries);
    return (
      <Fragment>
    
      <Grid  container justify="center">
        <Grid item  xs={12} md={6} sm={12} className="cardBackgroundColor">
          <Typography color="textSecondary" > Covid-19 Report from {countries.length} Countries  </Typography>
          {/* <form  noValidate autoComplete="off">
            <Input placeholder="Search" onChange={this.search}  />
          </form> */}
        </Grid>
      </Grid>
        {/* <Typography >  </Typography> */}
        {loading ? (
          <h1> Loading... </h1>
        ) : (
          <TableContainer style={{ overflow: "scroll", height: "50vh", maxWidth:"95%", margin:"0 auto" }} >
            <Table   stickyHeader aria-label="sticky table" >
              <TableHead>
                <TableRow>
                  {/* <TableCell align="right">Flag</TableCell>   */}
                  <TableCell align="left" className="tableHeader">
                    <Select native onChange={this.selectCountry} >
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
                  <TableCell align="center" className="tableHeader">TotalCases</TableCell>
                  <TableCell align="center" className="tableHeader">NewCases</TableCell>
                  <TableCell align="center" className="tableHeader">TotalActive</TableCell>
                  <TableCell align="center" className="tableHeader">TotalRecovered</TableCell>
                  <TableCell align="center" className="tableHeader">NewRecovered</TableCell>
                  <TableCell align="center" className="tableHeader">Critical</TableCell>
                  <TableCell align="center" className="tableHeader">TotalDeaths</TableCell>
                  <TableCell align="center" className="tableHeader">NewDeaths</TableCell>
                  {/* <TableCell style={{paddingleft:"60px"}} align="left" >Department</TableCell>   */}
                </TableRow>
              </TableHead>
              <TableBody>
                {count >= 2 ? (
                  data.map((result, index) => {
                    return (
                      <TableRow hover key={result.country} className={result.active === 0 ? 'noCases':'' }>
                        {/* <TableCell align="left"><img src={result.countryInfo.flag} alt={result.countryinfo.flag} /></TableCell>  */}
                        <TableCell align="center">
                        <Box display="flex" flexWrap="nowrap"  align="center"  >
                          <Box>
                            <Avatar style={{height:"30px", width:"50px"}} variant="square" alt={result.country} src={data[index].countryInfo.flag} />
                          </Box>
                          <Box style={{margin:"5px 0px 0px 5px"}}> {result.country.toLocaleString()} </Box>
                        </Box>
                        </TableCell>
                        <TableCell align="center">{result.cases.toLocaleString()}</TableCell>
                        <TableCell align="center">{result.todayCases.toLocaleString()}</TableCell>
                        <TableCell align="center">{result.active.toLocaleString()}</TableCell>
                        <TableCell align="center">{result.recovered.toLocaleString()}</TableCell>
                        <TableCell align="center">{result.todayRecovered.toLocaleString()}</TableCell>
                        <TableCell align="center">{result.critical.toLocaleString()}</TableCell>
                        <TableCell align="center">{result.deaths.toLocaleString()}</TableCell>
                        <TableCell align="center">{result.todayDeaths.toLocaleString()}</TableCell>

                      </TableRow>
                    );
                  })
                ) : (

                  <TableRow>
                    {/* <TableCell align="left"><img src={result.countryInfo.flag} alt={result.countryinfo.flag} /></TableCell>  */}
                    <TableCell align="center">{filterData.country}</TableCell>
                    <TableCell align="center">{filterData.cases.toLocaleString()}</TableCell>
                    <TableCell align="center">{filterData.todayCases.toLocaleString()}</TableCell>
                    <TableCell align="center">{filterData.active.toLocaleString()}</TableCell>
                    <TableCell align="center">{filterData.recovered.toLocaleString()}</TableCell>
                    <TableCell align="center">{filterData.todayRecovered.toLocaleString()}</TableCell>
                    <TableCell align="center">{filterData.critical.toLocaleString()}</TableCell>
                    <TableCell align="center">{filterData.deaths.toLocaleString()}</TableCell>
                    <TableCell align="center">{filterData.todayDeaths.toLocaleString()}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
       <Grid  container justify="center">
        <Grid item xs={12} md={6} sm={12} className="cardBackgroundColor">
          <Typography > <span style={{ backgroundColor: "#e9ffdb", padding:"3px" }}>Highlighted in green = all cases have recovered from the infection (no death)  </span> </Typography>
        </Grid>
      </Grid>
      </Fragment>
    );
  }
}
export default DashboardTable;
