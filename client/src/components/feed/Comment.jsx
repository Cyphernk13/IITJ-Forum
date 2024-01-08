import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { BiDislike, BiDislikeFill } from 'react-icons/bi';
import { BsHeart, BsHeartFill, BsChat } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './../../css/enter/enter.css';
import axios from 'axios';
import Reply from './Reply';
import { AppContext } from '../../App';
import svg from './../../svg';

function Comment({ comment, replies, setType }) {
  const [email, setEmail] = useState("");
  const [like, setLike] = useState({ like: -1, dislike: -1 });
  const [pfp,setPfp] = useState('')  
  const [username,setUsername] = useState('')

  useEffect(() => {
    const storedData = localStorage.getItem('email');
    
    if (storedData) {
      setEmail(storedData);
    }
    
    const fetchData = async (id) => {
      var response = await axios.post("http://localhost:5000/feed/likeDislikeFetch", { id, author: storedData });
      setLike(response.data)
      response = await axios.post("http://localhost:5000/profile/getUser",{email:comment.author})
      setPfp(response.data.profilePicture)
      setUsername(response.data.username)
    }
    
    fetchData(comment._id);
  }, []);

  const onDisLike = async () => {
    try {
      await axios.post("http://localhost:5000/feed/likeDislikeUpdateUser", {
        id: comment._id,
        user: email,
        like: like.dislike !== 1 ? 0 : -1,
        dislike: like.dislike !== 1 ? 1 : -1,
      });

      const likes = (like.dislike === -1) ? parseInt(comment.likes, 10) : ((like.dislike === 0) ? parseInt(comment.likes, 10) - 1 : parseInt(comment.likes, 10));
      const dislikes = (like.dislike === -1) ? parseInt(comment.dislikes, 10) + 1 : ((like.dislike === 0) ? parseInt(comment.dislikes, 10) + 1 : parseInt(comment.dislikes, 10) - 1);

      const response = await axios.post("http://localhost:5000/feed/likeDislikeUpdatePost", {
        type: "comment",
        id: comment._id,
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
        id: comment._id,
        user: email,
        like: like.like !== 1 ? 1 : -1,
        dislike: like.like !== 1 ? 0 : -1,
      });

      const likes = (like.like === -1) ? parseInt(comment.likes, 10) + 1 : ((like.like === 0) ? parseInt(comment.likes, 10) + 1 : parseInt(comment.likes, 10) - 1);
      const dislikes = (like.like === -1) ? parseInt(comment.dislikes, 10) : ((like.like === 0) ? parseInt(comment.dislikes, 10) - 1 : parseInt(comment.dislikes, 10));

      const response = await axios.post("http://localhost:5000/feed/likeDislikeUpdatePost", {
        type: "comment",
        id: comment._id,
        likes,
        dislikes,
      });

      setLike((prev) => ({ ...prev, like: like.like !== 1 ? 1 : -1, dislike: like.like !== 1 ? 0 : -1 }));
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  };

  const formattedDateTime = new Date(comment.time).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div >
      <p >
        <img
          src={pfp}
          alt="User Avatar"
          className="rounded-circle me-2"
          style={{ width: '30px', height: '30px' }}
        />
        <Link to="/profile" className='text-white-50' style={{ textDecoration: 'none' }}>
          {username}{' '} | {formattedDateTime}
        </Link>
      </p>
      <p style={{color:'#d7dadc'}}>{comment.comment}</p>

      <Button
              variant={`outline-danger${like.like === 1 ? ' active' : ''}`}
              size="sm"
              className="m-1"
              onClick={onLike}
            >
              {like.like !== 1 ? svg.LikeFilled : svg.LikeNotFilled} { comment.likes }
            </Button>

        <Button variant={`outline-secondary${like.dislike === 1 ? ' active' : ''}`} size="sm" className="m-1" onClick={onDisLike}>
    {like.dislike !== 1 ? svg.DislikeFilled : svg.DislikeNotFilled} {comment.dislikes}
            </Button>
      <Button variant="outline-primary" size="sm" className='m-1' onClick={() => setType({ type: 'Reply', id: comment._id })}>
        <BsChat /> Reply
      </Button>
      {replies.map(reply => <Reply reply={reply} />)}
    </div>
  );
}

export default Comment;
