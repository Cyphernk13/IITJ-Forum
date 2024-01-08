import React, { useState, useEffect } from 'react';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiDislike } from 'react-icons/bi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import svg from './../../svg';

function Reply({ reply }) {
  const navigate = useNavigate()
  const [like, setLike] = useState({ like: -1, dislike: -1 });
  const [email, setEmail] = useState('');
  const [pfp,setPfp] = useState('')
  const [username,setUsername] = useState('')
  useEffect(() => {
    const storedData = localStorage.getItem('email');
    if (storedData) {
      setEmail(storedData);
    }

    const fetchData = async (id) => {
      var response = await axios.post("http://localhost:5000/feed/likeDislikeFetch", { id, author: storedData });
      setLike(response.data);
      response = await axios.post("http://localhost:5000/profile/getUser",{email:reply.author})
      // console.log(response)
      setPfp(response.data.profilePicture)
      setUsername(response.data.username)
      
    }
    fetchData(reply._id);
  }, []);

  const onDisLike = async () => {
    try {
      await axios.post("http://localhost:5000/feed/likeDislikeUpdateUser", {
        id: reply._id,
        user: email,
        like: like.dislike !== 1 ? 0 : -1,
        dislike: like.dislike !== 1 ? 1 : -1,
      });

      var likes, dislikes;
      if (like.dislike === -1) { likes = parseInt(reply.likes, 10); dislikes = parseInt(reply.dislikes, 10) + 1; }
      else if (like.dislike === 0) { likes = parseInt(reply.likes, 10) - 1; dislikes = parseInt(reply.dislikes, 10) + 1; }
      else { likes = parseInt(reply.likes, 10); dislikes = parseInt(reply.dislikes, 10) - 1; }

      const response = await axios.post("http://localhost:5000/feed/likeDislikeUpdatePost", {
        type: "reply",
        id: reply._id,
        likes,
        dislikes,
      });

      setLike(prev => ({ ...prev, like: like.dislike !== 1 ? 0 : -1, dislike: like.dislike !== 1 ? 1 : -1 }));
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  }

  const onLike = async () => {
    try {
      await axios.post("http://localhost:5000/feed/likeDislikeUpdateUser", {
        id: reply._id,
        user: email,
        like: like.like !== 1 ? 1 : -1,
        dislike: like.like !== 1 ? 0 : -1,
      });

      var likes, dislikes;
      if (like.like === -1) { likes = parseInt(reply.likes, 10) + 1; dislikes = parseInt(reply.dislikes, 10); }
      else if (like.like === 0) { likes = parseInt(reply.likes, 10) + 1; dislikes = parseInt(reply.dislikes, 10) - 1; }
      else { likes = parseInt(reply.likes, 10) - 1; dislikes = parseInt(reply.dislikes, 10); }

      const response = await axios.post("http://localhost:5000/feed/likeDislikeUpdatePost", {
        type: "reply",
        id: reply._id,
        likes,
        dislikes,
      });

      setLike(prev => ({ ...prev, like: like.like !== 1 ? 1 : -1, dislike: like.like !== 1 ? 0 : -1 }));
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  }

  const formattedDateTime = new Date(reply.time).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='mt-3' style={{backgroundColor:'#1d1f20'}} >
      {/* {console.log(pfp)} */}
      <p>
        <img
          src={pfp}
          alt="User Avatar"
          className="rounded-circle me-2"
          style={{ width: '30px', height: '30px' }}
        />
        <p onClick={() => navigate('/profile',{state:reply.author})} className='text-white-50' style={{ textDecoration: 'none'}} >
          {username} | {formattedDateTime}
        </p>
      </p>
      <p style={{color:'#d7dadc'}}>{reply.reply}</p>
      <Button
              variant={`outline-danger${like.like === 1 ? ' active' : ''}`}
              size="sm"
              className="m-1"
              onClick={onLike}
            >
              {like.like !== 1 ? svg.LikeFilled : svg.LikeNotFilled} { reply.likes }
            </Button>

        <Button variant={`outline-secondary${like.dislike === 1 ? ' active' : ''}`} size="sm" className="m-1" onClick={onDisLike}>
    {like.dislike === 1 ? svg.DislikeFilled : svg.DislikeNotFilled} {reply.dislikes }
            </Button>

    </div>
  );
}

export default Reply;
