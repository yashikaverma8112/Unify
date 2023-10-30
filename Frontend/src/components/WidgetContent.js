import React from 'react'
import './css/widgetContent.css'
import { Avatar } from '@material-ui/core'
const WidgetContent = () => {
  return (
  <>
       
    <div className='widgetContent__contents'>
        <div className="widgetContent__content">
            <Avatar />
            <div className="widgetContent__contentTitle">
                <h5>Mobile App Programmer</h5>
                <p>The best Mobile App Development Company</p>

            </div>
        </div>
        <div className="widgetContent__content">
            <Avatar />
            <div className="widgetContent__contentTitle">
                <h5>Web App </h5>
                <p>The best Web Development Company</p>

            </div>
        </div>
        <div className="widgetContent__content">
            <Avatar />
            <div className="widgetContent__contentTitle">
                <h5>Programmer</h5>
                <p>The best Development Company</p>

            </div>
        </div>
    </div>
  </>
  )
}

export default WidgetContent