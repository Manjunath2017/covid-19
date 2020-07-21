import React, { Component, Fragment } from "react";
import Header from './navBar/Header';
import Footer from './navBar/Footer';

import DashbordContent from './Module/DashboardContent';
import DashboardTable from './Module/DashboardTable';
import Test from './Module/Test';

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
         <Header />
         <Test />
         <DashbordContent />
         <DashboardTable />
         <Footer />
      </Fragment>
    );
  }
}
export default Dashboard;