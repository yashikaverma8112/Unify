import React from 'react'
import SideBarOptions from './SideBarOptions';
import './css/sidebar.css'
// import Widget from './Widget';
const SideBar = () => {
  return (
    <div className='sidebar'>
      <SideBarOptions />
      {/* <Widget /> */}
    </div>
  )
}

export default SideBar