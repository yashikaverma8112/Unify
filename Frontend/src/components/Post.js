import React, { useState } from 'react'
import './css/post.css'
import CloseIcon from '@material-ui/icons/Close'
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'
import { Avatar } from '@material-ui/core'
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlined, Delete, Edit, MoreHorizOutlined, MoreVertOutlined, RepeatOneOutlined, ShareOutlined } from '@material-ui/icons'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios';
import DOMPurify from 'dompurify';
// import ReactHtmlParser from "html-react-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";


const sanitizeHTML = (html) => {
  return { __html: DOMPurify.sanitize(html) }; // Sanitize HTML content
};

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}
function Post({ post, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const[likes, setLikes] = useState(0);
  const[dislikes,setDislikes] = useState(0);
  const [activeLike, setActiveLike] = useState(false);  
  const [activeDislike, setActiveDislike] = useState(false);  
  
  const Close = <CloseIcon />;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [likedAns, setLikedAns] = useState(null);
  const [isOptionsAns, setIsOptionsAns] = useState(null);
  const[inp,setInp] = useState(false);
  const toggleOptions = () => {

    setIsOptionsOpen(!isOptionsOpen);
  };

  const toggleOptionsAns = (index) => {
    if(isOptionsAns===index){
      setIsOptionsAns(null);
    }
    else{

      setIsOptionsAns(index);
    }
  }
  const user = useSelector(selectUser);

  const handleQuill = (value) => {
    setAnswer(value);
  };
  // console.log(answer);

  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        user: user,
      };
      await axios
        .post("http://localhost:80/api/answers", body, config)
        .then((res) => {
          console.log(res.data);
          alert("Answer added succesfully");
          setIsModalOpen(false);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const handleUpdate = async (questionId) => {
    if (post?._id && (answer !== post?.answer)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        questionName: prompt("Question Name"),
        questionUrl: prompt("Question Url"),
        questionId: post?._id,
        user: user,
      };

      await axios
        // .put(`http://localhost:80/api/answers/${answerId}`, body, config) // Use the PUT request to update the question
        .put(`http://localhost:80/api/questions/${questionId}`, body, config) // Use the PUT request to update the question
        .then((res) => {
          console.log(res.data);
          alert("Question and Answer updated successfully");
          // setIsModalOpen(false);

          window.location.reload(); // Reload the page to see the updated content
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const deleteQuestion = async (questionId) => {
    // Make an API call to the Node.js server to delete the question
    await axios.delete(`http://localhost:80/api/questions/del/${questionId}`)
      .then((res) => {
        console.log(res.data);
        alert("Question deleted successfully");
        window.location.reload(); // Reload the page to see the updated content
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const handleUpdateAns = async (answerId) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      answer: prompt("Updated Answer"),
      user: user,
    };

    await axios
      // .put(`http://localhost:80/api/answers/${answerId}`, body, config) // Use the PUT request to update the question
      .put(`http://localhost:80/api/answers/${answerId}`, body, config) // Use the PUT request to update the question
      .then((res) => {
        console.log(res.data);
        alert("Answer updated successfully");

        window.location.reload(); // Reload the page to see the updated content
      })
      .catch((e) => {
        console.log(e);
      });

  }

  const deleteAns = async (answerId) => {
    await axios.delete(`http://localhost:80/api/answers/del/${answerId}`)
      .then((res) => {
        console.log(res.data);
        alert("answer deleted successfully");
        window.location.reload(); // Reload the page to see the updated content
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleLikes = (answerId) =>{
    
    if(likedAns===answerId ){
      setLikedAns(null);
      setLikes(likes+1);
      setDislikes(dislikes-1);
      setActiveLike(true);
      setActiveDislike(false);
    }
    else{
     setLikedAns(answerId)
     setLikes(0);
     setDislikes(1);
     setActiveLike(false);
     setActiveDislike(true);
    }
    
  }



  const handleComment=(chatid)=>{
    
    setInp (!inp);
  }

  return (
    <div className="post">
      <div className="post__info">
        <Avatar src={post?.user?.photo} />
        <h4>{post?.user?.userName}</h4>

        <small>
          <LastSeen date={post?.createdAt} />
        </small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{post?.questionName}</p>
          <button
            onClick={() => {
              setIsModalOpen(true);
              console.log(post?._id);
            }}
            className="post__btnAnswer"
          >
            Answer
          </button>
          <Modal

            open={isModalOpen}
            closeIcon={Close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },

            }}
          >
            <div className="modal__question">
              <h1>{post?.questionName}</h1>
              <p>
                asked by <span className="name">{post?.user?.userName}</span> on{" "}
                <span className="name">
                  {new Date(post?.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <ReactQuill
                className='react__quill'
                value={answer}
                onChange={handleQuill}
                placeholder="Enter your answer"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        <img src={post.questionUrl} alt="" />
      </div>
      <div className="post__footer">
        {/* <div className="post__footerAction">
              <ArrowUpwardOutlined />
              <ArrowDownwardOutlined />
            </div>
            <RepeatOneOutlined />
            <ChatBubbleOutlined /> */}
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined onClick={toggleOptions} />

          <div>
            {isOptionsOpen && (
              <div className="options-dropdown">
                <button className='editting btn btn-outline-success'
                  onClick={() => {
                    console.log(post?._id);
                    handleUpdate(post?._id);
                  }
                  } type="submit">
                  <Edit /> Edit

                </button>
                <button className='deleting btn btn-outline-danger'
                  onClick={() => deleteQuestion(post?._id)} type='submit'>
                  <Delete /> Delete
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
        {post?.allAnswers.length} Answer(s)
      </p>

      <div
        style={{
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post__answer"
      >
        {post?.allAnswers?.map((_a) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                borderTop: "1px solid lightgray",
              }}
              className="post-answer-container"
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                }}
                className="post-answered"
              >

                <Avatar src={_a?.user?.photo} />
                <div
                  style={{
                    margin: "0px 10px",
                  }}
                  className="post-info"
                >
                  <p>{post?.user?.userName}</p>

                  <span>
                    <LastSeen date={_a?.createdAt} />
                  </span>

                </div>
              </div>
              {/* <p className="post-answer">{_a?.answer}</p> */}
              <div dangerouslySetInnerHTML={sanitizeHTML(_a?.answer)} />

            </div>
            <div style={{ "float": "right" }} >
                 
              {isOptionsAns===_a?._id && (
                <div className="options-dropdown options-ans">
                  <div className='edit_ans'
                    onClick={() => {
                      console.log(_a?._id);
                      handleUpdateAns(_a?._id);
                    }
                    } type="submit">
                    <Edit /> Edit

                  </div>
                  <div className='delete_ans'
                    onClick={() => deleteAns(_a?._id)} type='submit'>
                    <Delete /> Delete
                  </div>
                 </div> 
              )}
           

              <MoreVertOutlined onClick={()=>{toggleOptionsAns(_a?._id)}} style={{ "cursor": "pointer" }} />
            </div>

            <div className="post__footer" style={{ "float": "left" }}>
              {likes}<ArrowUpwardOutlined onClick={()=>{handleLikes(_a?._id)}} style={{ color: activeLike ? "blue" : "black" }} />
              {dislikes}<ArrowDownwardOutlined onClick={()=>{ handleLikes(_a?._id)}} style={{ color: activeDislike ? "blue" : "black" }}/>
              <RepeatOneOutlined />

              <ChatBubbleOutlined  onClick={handleComment} />
              {
                inp && (
                  <div>
                  <input type='text' placeholder='Write Your Comment Here...'/>
                  <div>userName : Nice</div>
                  </div>
                )
              }
            </div>


          </>
        ))}
        </div>
    </div>
  );
}

export default Post;