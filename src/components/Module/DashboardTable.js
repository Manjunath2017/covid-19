import React, { Component, Fragment } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  // Select,
  Typography,
  Grid,
  TextField,
  // Box,
  // Avatar
} from "@material-ui/core";
// import Input from '@material-ui/core/Input';



class DashboardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      filter:"",
      // filterData: [],
      // count: 0,
      countries: []
    };
    // this.selectCountry = this.selectCountry.bind(this);
    this.search = this.search.bind(this);
  }
  //get all countries corona cases
  async getCounteriesDetail() {
    //loading set to true till
    this.setState({ loading: true });
    try {
      //make an http call
      const res = await axios.get("https://corona.lmao.ninja/v2/countries");
      // res.data.map(result=>{
      //   console.log(result.countryInfo.flag);
      // })

      //After getting data set the result
      this.setState({ data: res.data });
      // console.log(Object.keys(this.state.data).length);

      // const pushCountry = [];
      // var count = 0;
      // for (var i in this.state.data) {
      //   // console.log(this.state.data[i].country);
      //   pushCountry.push({ name: this.state.data[i].country });
      //   count++;
      // }
      // this.setState({ count });
      // this.setState({ countries: pushCountry });
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

  // //Filer ...... its working 
  // selectCountry(event) {
  //   // this.setState({select:event.target.value});
  //   const data = this.state.data;
  //   // console.log('test handle click!', event.target.value, 'country.countries');
  //   var count = 0;
  //   if (event.target.value === "reset") {
  //     count = 2;
  //     this.setState({ count });
  //     // console.log(this.state.count);
  //   }
  //   this.setState({ count });

  //     data
  //       .filter((country) => country.country === event.target.value)
  //       .map((countryDetail) => {
  //         // console.log('countryDetail', countryDetail);
  //         count++;
  //       return this.setState({ filterData: countryDetail });
  //       });
  //   // console.log(typeof this.state.filterData, 'count', count);
  // }
  //textBox Search ......
search(event) {
  event.preventDefault(); 
  console.dir('search !'); 

  ////get value from user and assign it to 'filter'
  this.setState({filter:event.target.value});


}

  render() {
    const { data, loading,  filter } = this.state; 
    //convert to lowercase
    const searchDataToLowerCase=filter.toString().toLowerCase();
  
    const filteredResult = data.filter(item => {
      // console.log('item', Object.keys(item).some(key =>item[key].toString().toLowerCase() ) );
      
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(searchDataToLowerCase)
        );
      });

    return (
      <Fragment>
      <Grid  container justify="center">
        <Grid item  xs={12} md={6} sm={12} className="cardBackgroundColor">
          <Typography color="textSecondary" > Covid-19 Report of {Object.keys(data).length} Countries  </Typography>
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
                    {/*
                    its working
                    <Select native onChange={this.selectCountry} >
                      <option value="reset"> Select country or Reset </option>
                      {countries.map((result) => {
                        return (
                          <option value={result.name} key={result.name}>
                            {result.name}
                          </option>
                        );
                      })}
                    </Select> */}
                    <span style={{visibility:"hidden"}}>SelectCountry</span>
                    <TextField style={{marginTop:"-32px"}}label="SearchCountry" onChange={this.search}  />
                  </TableCell>
                  <TableCell align="center" className="tableHeader">Total Cases</TableCell>
                  <TableCell align="center" className="tableHeader">New Cases</TableCell>
                  <TableCell align="center" className="tableHeader">Total Active</TableCell>
                  <TableCell align="center" className="tableHeader">Total Recovered</TableCell>
                  <TableCell align="center" className="tableHeader">New Recovered</TableCell>
                  <TableCell align="center" className="tableHeader">Critical</TableCell>
                  <TableCell align="center" className="tableHeader">Total Deaths</TableCell>
                  <TableCell align="center" className="tableHeader">New Deaths</TableCell>
                  {/* <TableCell style={{paddingleft:"60px"}} align="left" >Department</TableCell>   */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResult.map((result) => {
                    return (
                      <TableRow hover key={result.country} className={
                        ( (result.active === 0) && (result.deaths === 0) ) ? 'noCasesAndDeath': (result.active === 0)? 'noCases':'' 
                      }>                       
                        {/* <TableCell align="center">
                          <Box display="flex" flexWrap="nowrap"  align="center"  >
                            <Box>
                              <Avatar style={{height:"30px", width:"50px"}} variant="square" alt={result.country} src={result.countryInfo.flag} />
                            </Box>
                            <Box style={{margin:"5px 0px 0px 5px"}}> {result.country.toLocaleString()} </Box>
                          </Box>
                        </TableCell> */}
                        <TableCell align="left">{result.country.toLocaleString()}</TableCell>
                        <TableCell align="center">{result.cases.toLocaleString()}</TableCell>
                        <TableCell align="center" className={result.todayCases > 0? 'newCases':''}>{result.todayCases >0? '+'+result.todayCases.toLocaleString() : '0' }</TableCell>
                        <TableCell align="center">{result.active.toLocaleString()}</TableCell>
                        <TableCell align="center">{result.recovered.toLocaleString()}</TableCell>
                        <TableCell align="center" className={result.todayRecovered > 0? 'newRecoveries':''}>{result.todayRecovered>0? '+'+result.todayRecovered.toLocaleString() : '0' }</TableCell>
                        <TableCell align="center">{result.critical.toLocaleString()}</TableCell>
                        <TableCell align="center">{result.deaths.toLocaleString()}</TableCell>
                        <TableCell align="center" className={result.todayDeaths > 0? 'newDeaths':''}>{result.todayDeaths>0? '+'+result.todayDeaths.toLocaleString() : '0' }</TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        )}
       <Grid  container justify="center">
        <Grid item xs={12} md={6} sm={12} className="cardBackgroundColor">
          <Typography align="left" style={{color:"rgba(0, 0, 0, 0.54)"}}><span style={{ backgroundColor: "#e9ffdb", padding:"3px", margin:"3px" }}>1) Highlighted in green</span>= All cases have recovered from the infection (no death). </Typography>
          <Typography align="left" style={{color:"rgba(0, 0, 0, 0.54)"}}><span style={{ backgroundColor: "#c3e6fc", padding:"3px", margin:"3px" }}>2) Highlighted in sky blue</span>= Currently no active cases. </Typography>
        </Grid>
      </Grid>
      </Fragment>
    );
  }
}
export default DashboardTable;
