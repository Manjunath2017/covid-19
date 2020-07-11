import React, { Component, Fragment } from "react";
import Header from './navBar/Header';
import Footer from './navBar/Footer';

import DashbordContent from './Module/DashboardContent';
import DashboardTable from './Module/DashboardTable';

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
         <Header />
         <DashbordContent />
         <DashboardTable />
         <Footer />
      </Fragment>
    );
  }
}
export default Dashboard;