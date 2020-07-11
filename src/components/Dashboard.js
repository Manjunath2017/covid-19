import React, { Component, Fragment } from "react";
import Header from './navBar/Header';
import DashbordContent from './Module/DashboardContent';
import DashboardTable from './Module/DashboardTable';

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
         <Header />
         <DashbordContent />
         <DashboardTable />
      </Fragment>
    );
  }
}
export default Dashboard;