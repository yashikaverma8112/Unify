import { Avatar } from '@material-ui/core'
import React from 'react'
import './css/unifyBox.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../feature/userSlice'

const UnifyBox = () => {
  const user = useSelector(selectUser)
  return (
    <div className='unifyBox'>
        <div className="unifyBox_info">
          <Avatar src={user?.photo} />
        </div>

      <div className="unifyBox_content">
        <h5>What is your Question or link ?</h5>
      </div>
    </div>
  )
}

export default UnifyBox

