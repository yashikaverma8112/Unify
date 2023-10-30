import React, { useState } from 'react'
import './css/header.css'
import axios from 'axios'
import logo from '../images/logo.png'
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close' 
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import { AssignmentIndOutlined,  ExpandMore,  NotificationsOutlined,  PeopleAltOutlined, Search } from '@material-ui/icons';
import { Avatar, Button, Input } from '@material-ui/core';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../feature/userSlice';
const Header = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const Close = (<CloseIcon />)  
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const handleLogout =() =>{
    if(window.confirm("Are you sure to Logout ?")){

      signOut(auth)
      .then(()=>{
         dispatch(logout())
         
      })
      .catch ((err)=>{
        console.log(err)
      })
    }
  }

  const handleSubmit=async()=>{
    if(question!==""){
       const config ={
        headers :{
          "Content-Type" :"application/json"
        }
       }
        const body = {
          questionName : question,
          questionUrl : inputUrl,
          user :user
        }
        // await axios.post('/api/questions',body,config)
        await axios.post('http://localhost:80/api/questions',body,config)
                   .then((res)=>{
                      console.log(res.data);
                      alert(res.data.message);
                      window.location.href ="/";
        })
                   .catch((e)=>{
                    console.log(e);
                    alert("Error in adding Questions")
                   });
    } 
  }
  return (
    <div className='header'>
        <div className="header-container">
            <div className="header-logo">
              <img src={logo} alt="logo" />
              </div>
              <div className="header-icons">
                <div className="header-icon"><HomeIcon /></div>
                <div className="header-icon"><FeaturedPlayListOutlinedIcon /></div>
                <div className="header-icon"><AssignmentIndOutlined/></div>
                <div className="header-icon"><PeopleAltOutlined/></div>
                <div className="header-icon"><NotificationsOutlined /></div>
              </div>
              <div className='header-input'>
                <Search />
                <input type='text' placeholder='Search Questions'/>
              </div>
              <div className="header-rest">
                <span onClick={handleLogout}>
                <Avatar src={user?.photo} />

                </span>
              </div>
              <Button onClick={()=>setIsModalOpen(true)}>Add Question</Button>
              <Modal open = {isModalOpen}
              closeIcon = {Close}
              onClose={()=>setIsModalOpen(false)}
              closeOnEsc
              center
              closeOnOverlayClick={false}
              styles={{
                overlay:{
                  height:"auto"
                }
              }}
              >
               <div className="modal__title">
                <h5>Add Question</h5>
                <h5>Share Link</h5>
               </div>
               <div className="modal__info">
                <Avatar className='avatar'/>
                <div className="modal__scope">
                  <PeopleAltOutlined />
                  <p>Public</p>
                  <ExpandMore />
                </div>
               </div>
               <div className="modal__Field">
               <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
                <div style={{
                  display:"flex",
                  flexDirection:"column",

                }}>
                  <input
                  value={inputUrl}
                  onChange={(e)=>setInputUrl(e.target.value)}
                  style={{
                    margin:"5px 0",
                    border:"1px solid lightgray",
                    padding:"10px",
                    outline:"2px solid #000"
                  }}
                  type="text" placeholder='Optional : include a link that gives context'/>
                  {
                    inputUrl!== "" && <img style={{
                      height:"40vh",
                      objectFit:"contain"
                    }} src={inputUrl} alt="displayImage" />
                  }
                </div>
               </div>
                  <div className="modal__buttons">
                    <button className='cancle' onClick={()=>setIsModalOpen(false)}> Cancel</button>
                    <button className='add' onClick={handleSubmit} > Add Question</button>
                  </div>
              </Modal>

        </div>
    </div>
  )
}

export default Header;