import React from 'react'
import './css/unify.css'
import Header from './Header'
import SideBar from './SideBar'
import Feed from './Feed'
import Widget from './Widget'
const Unify = () => {
  return (
    <div className='unify'>
        <Header />
        <div className="unify-container">
            <div className="unify-content">
              <Widget  />
              <Feed />
              <SideBar />
            </div>
        </div>
    </div>
  )  }

export default Unify