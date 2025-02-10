import React, { Fragment } from 'react';
import Loader from "../layout/loader";
import Header from '../layout/header'
import Sidebar from '../layout/sidebar'
import Footer from '../layout/footer'
import ThemeCustomize from "../layout/theme-customizer";
import {ToastContainer} from 'react-toastify'

const App = ({children}) => {
  console.warn = () => {}
  return (
    <Fragment>
      <Loader/>
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
      <Header/>
      <div className="page-body-wrapper sidebar-icon">
        <Sidebar/>
        <div className="page-body">
          {children}
        </div>
        <Footer/>
        {/* <ThemeCustomize/> */}
        </div>
      </div>
      <ToastContainer/>
    </Fragment>
  );
}

export default App;