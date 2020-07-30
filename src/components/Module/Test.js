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
  Avatar,
  Box,
  TextField,
  Input
} from "@material-ui/core"; 

class DashboardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      filter:"",
      filterData: {},
      count: 0,
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
      // console.log(res);
      //After getting data set the result
      this.setState({ data: res.data });

      // const pushCountry = [];
      // var count = 0;
      // for (var i in this.state.data) {
      //   // console.log(this.state.data[i].country);
      //   pushCountry.push({ name: this.state.data[i].country });
      //   count++;
      // }
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
  }
   
//textBox Search ......
search(event) {
  event.preventDefault(); 
  console.dir('search !'); 

  ////get value from user and assign it to 'filter'
  // this.setState({filter:event.target.value});
  const dataToSearch=event.target.value;
   
  const searchDataToLowerCase=dataToSearch.toString().toLowerCase();

  console.log(searchDataToLowerCase);

  const filteredResult = data.filter(item => {

    console.log('item', Object.keys(item).some(key =>item[key].toString().toLowerCase() ) );

    return Object.keys(item).some(key =>
      item[key].toString().toLowerCase().includes(searchDataToLowerCase)
      );
    });

    console.log(filteredResult);

}

  render() {
    // console.log('this', this.state.data.);
    const { data, countries, loading, count, filterData, filter } = this.state;
    // console.log(countries);
   
    const searchDataToLowerCase=filter.toString().toLowerCase();

    console.log(searchDataToLowerCase);
  
    const filteredResult = data.filter(item => {
  
      console.log('item', Object.keys(item).some(key =>item[key].toString().toLowerCase() ) );
  
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(searchDataToLowerCase)
        );
      });
  
      console.log(filteredResult);

    return (
      <Fragment>
    
      <Grid  container justify="center">
        <Grid item  xs={12} md={6} sm={12} className="cardBackgroundColor">
          <Typography color="textSecondary" > Covid-19 Report from {countries.length} Countries  </Typography>
          <form>
            <Input placeholder="Search" onChange={this.search}  />
          </form>
        </Grid>
      </Grid>
        <form  noValidate autoComplete="on">
          <div>

          </div>
        </form>
      
        {loading ? (
          <h1> Loading... </h1>
        ) : (
          <TableContainer style={{ overflow: "scroll", height: "50vh", maxWidth:"95%", margin:"0 auto" }} >
            <Table   stickyHeader aria-label="sticky table" >
              <TableHead>
                <TableRow>
                  {/* <TableCell align="right">Flag</TableCell>   */}

                  <TableCell align="left" className="tableHeader">
                    <TextField label="Search country" onChange={this.search}  />
                  </TableCell>
                  
                  <TableCell align="left" className="tableHeader">Cases</TableCell>
                  {/* <TableCell align="left" className="tableHeader">Active</TableCell>
                  <TableCell align="left" className="tableHeader">Recovered</TableCell>
                  <TableCell align="left" className="tableHeader">Critical</TableCell>
                  <TableCell align="left" className="tableHeader">Deaths</TableCell> */}
                  {/* <TableCell style={{paddingleft:"60px"}} align="left" >Department</TableCell>   */}
                </TableRow>
              </TableHead>
              <TableBody>
             
                  {filteredResult.map((result, index) => {
                    return (
                      <TableRow hover key={result.country} className={result.active === 0 ? 'noCases':'' }>
                        <TableCell align="left"  > 
                        <Box display="flex" flexWrap="nowrap"   >
                          <Box>
                            <Avatar style={{height:"30px", width:"50px"}} variant="square" alt={result.country} src={data[index].countryInfo.flag} />
                            {/* <Avatar style={{height:"100%", width:"50px"}} variant="square" alt="Remy Sharp" src= /> */}
                          </Box>
                          <Box style={{margin:"5px 0px 0px 5px"}}>
                              {result.country.toLocaleString()} 
                          </Box>
                        </Box>
                        </TableCell>
                        <TableCell align="left" >{result.cases.toLocaleString()}</TableCell>
                        {/* <TableCell align="left">{result.active.toLocaleString()}</TableCell>
                        <TableCell align="left">{result.recovered.toLocaleString()}</TableCell>
                        <TableCell align="left">{result.critical.toLocaleString()}</TableCell>
                        <TableCell align="left">{result.deaths.toLocaleString()}</TableCell> */}
                      </TableRow>
                    )
                  })
                }
                
                
              </TableBody>
            </Table>
          </TableContainer>
        )}
       <Grid  container justify="center">
        <Grid item xs={12} md={6} sm={12} className="cardBackgroundColor">
          <Typography > <span style={{ backgroundColor: "#e9ffdb", padding:"3px" }}>Highlighted in green = all cases have recovered from the infection  </span> </Typography>
        </Grid>
      </Grid>
      </Fragment>
    );
  }
}
export default DashboardTable;
