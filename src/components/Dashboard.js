import React, { Component, Fragment } from "react";
import Header from './navBar/Header';
import DashbordContent from './Module/DashboardContent';
class Dashboard extends Component {
  render() {
    return (
      <Fragment>
         <Header />
         <DashbordContent />

      </Fragment>
    );
  }
}
export default Dashboard;
