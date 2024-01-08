import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { BiDislike } from 'react-icons/bi';
import { BsHeart, BsChat } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import svg from '../../svg';
import './../../css/enter/enter.css';
import Comment from './Comment';
import axios from 'axios';

function FullQuestion({ data, setType }) {
  const [like, setLike] = useState({ like: -1, dislike: -1 });
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [pfp,setPfp] = useState('')  
  const [username,setUsername] = useState('')
  const handleReadMore = (postId) => {
    setExpandedPosts((prev) => [...prev, postId]);
  };
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    const storedData = localStorage.getItem('email');
    if (storedData) {
      setEmail(storedData);
    }

    const fetchData = async (id) => {
      var response = await axios.post("http://localhost:5000/feed/likeDislikeFetch", { id, author: storedData });
      setLike(response.data)
      response = await axios.post("http://localhost:5000/profile/getUser",{email:data.answer.author})
      setPfp(response.data.profilePicture)
      setUsername(response.data.username)

    };
    fetchData(data.answer._id);
  }, []);

  const [comment, setComment] = useState(false);

  const onDisLike = async () => {
    try {
      await axios.post("http://localhost:5000/feed/likeDislikeUpdateUser", {
        id: data.answer._id,
        user: email,
        like: like.dislike !== 1 ? 0 : -1,
        dislike: like.dislike !== 1 ? 1 : -1,
      });

      var likes, dislikes;
      if (like.dislike === -1) {
        likes = parseInt(data.answer.likes, 10);
        dislikes = parseInt(data.answer.dislikes, 10) + 1;
      } else if (like.dislike === 0) {
        likes = parseInt(data.answer.likes, 10) - 1;
        dislikes = parseInt(data.answer.dislikes, 10) + 1;
      } else {
        likes = parseInt(data.answer.likes, 10);
        dislikes = parseInt(data.answer.dislikes, 10) - 1;
      }

      const response = await axios.post("http://localhost:5000/feed/likeDislikeUpdatePost", {
        type: "answer",
        id: data.answer._id,
        likes,
        dislikes,
      });

      setLike((prev) => ({ ...prev, like: like.dislike !== 1 ? 0 : -1, dislike: like.dislike !== 1 ? 1 : -1 }));
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  };

  const onLike = async () => {
    try {
      await axios.post("http://localhost:5000/feed/likeDislikeUpdateUser", {
        id: data.answer._id,
        user: email,
        like: like.like !== 1 ? 1 : -1,
        dislike: like.like !== 1 ? 0 : -1,
      });

      var likes, dislikes;
      if (like.like === -1) {
        likes = parseInt(data.answer.likes, 10) + 1;
        dislikes = parseInt(data.answer.dislikes, 10);
      } else if (like.like === 0) {
        likes = parseInt(data.answer.likes, 10) + 1;
        dislikes = parseInt(data.answer.dislikes, 10) - 1;
      } else {
        likes = parseInt(data.answer.likes, 10) - 1;
        dislikes = parseInt(data.answer.dislikes, 10);
      }

      const response = await axios.post("http://localhost:5000/feed/likeDislikeUpdatePost", {
        type: "answer",
        id: data.answer._id,
        likes,
        dislikes,
      });

      setLike((prev) => ({ ...prev, like: like.like !== 1 ? 1 : -1, dislike: like.like !== 1 ? 0 : -1 }));
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  };

  const formattedDateTime = new Date(data.answer.time).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
    
      <Card style={{backgroundColor:'#1d1f20'}}>
        <Card.Body >
          <p className='text-white-50'>
            <img
              src={pfp}
              alt="User Avatar"
              className="rounded-circle me-2"
              style={{ width: '30px', height: '30px' }}
            />
            <Link to="/profile" className='text-white-50' style={{ textDecoration: 'none'}}>
              {username}{' '} | {formattedDateTime}
            </Link>
            <br />
            <br />
            <span style={{color:'#d7dadc'}} >{!expandedPosts.includes(1) ? data.answer.answer.slice(0,300) : data.answer.answer}</span>
            
          </p>
          {!expandedPosts.includes(1) && data.answer.answer.length>300  && (
            <Button variant="link" className='p-0' size='sm' onClick={() => handleReadMore(1)}>
              Read More
            </Button>
          )}
          <div className="d-flex align-items-center mt-2 ">
            <Button
              variant={`outline-danger${like.like === 1 ? ' active' : ''}`}
              size="sm"
              className="m-1"
              onClick={onLike}
            >
              {like.like === 1 ? svg.LikeFilled : svg.LikeNotFilled} {data.answer.likes}
            </Button>
            <Button variant={`outline-secondary${ like.dislike === 1 ? ' active' : ''}`} size="sm" className="m-1" onClick={onDisLike}>
              { like.dislike === 1 ? svg.DislikeFilled : svg.DislikeNotFilled}  {data.answer.dislikes + 0}
            </Button>
            <Button variant="outline-primary" size="sm" className='m-1' onClick={() => setType({ type: 'Comment', id: data.answer._id })}>
              <BsChat /> Comment
            </Button>
          </div>
          <br />

          {data.comments.map(comment => <Comment comment={comment.comment} replies={comment.replies} setType={setType} />)}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

export default FullQuestion;
