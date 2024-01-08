import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { BsChat } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import svg from './../../svg';
import './../../css/enter/enter.css';
const formattedDateTime = (dateTime) => {
  return new Date(dateTime).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
function Questions({ data }) {
  const navigate = useNavigate();
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [likeStatus, setLikeStatus] = useState('NotFilled'); 
  const [dislikeStatus, setDislikeStatus] = useState('NotFilled');
  const [pfp,setPfp] = useState('')
  const handleReadMore = (postId) => {
    setExpandedPosts((prev) => [...prev, postId]);
  }

  

  const handleLike = () => {
    setLikeStatus((prevStatus) => (prevStatus === 'NotFilled' ? 'Filled' : 'NotFilled'));
  };
  const handleDisLike = () => {
    setDislikeStatus((prevStatus) => (prevStatus === 'NotFilled' ? 'Filled' : 'NotFilled'));
  };

  return (
    <div className="feed-page" >
      <Card style={{backgroundColor:'#1d1f20',color:'#d7dadc'}}>
        <Card.Body>
          <h4
            className="questionheading"
            style={{ border: 'none', cursor: 'pointer' }}
            onClick={() => {
              navigate('/viewQuestion', { state: data?.question?._id });
            }}
          >
            {data?.question?.question || ''}
          </h4>
          <div className="user-info">
            <img
              src="https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"
              alt="User Avatar"
              className="rounded-circle me-2"
              style={{ width: '30px', height: '30px' }}
            />
            <Link to="/profile" className='text-white-50' style={{ textDecoration: 'none'}}>
              {data?.question?.author || ''} | {formattedDateTime(data?.question?.time) || ''}
            </Link>{' '}
          </div>
          <hr />
          {
          

          typeof data?.answer?.author === 'undefined'? <p>No answers yet</p> :
          <>
          <p>
            <img
              src="https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"
              alt="User Avatar"
              className="rounded-circle me-2"
              style={{ width: '30px', height: '30px' }}
            />
            <Link to="/profile" className='text-white-50' style={{ textDecoration: 'none'}}>
              {data?.answer?.author || ''} | {formattedDateTime(data?.answer?.time) || ''}
            </Link>{' '}
            <br />
            {!expandedPosts.includes(1) ? data?.answer?.answer.slice(0,300) || '' : data?.answer?.answer || ''}
          </p>
          {!expandedPosts.includes(1) && data?.answer?.answer.length > 300 && (
            <Button variant="link" className="p-0" size="sm" onClick={() => handleReadMore(1)}>
              Read More
            </Button>
          )}
          <div className="d-flex align-items-center mt-2">
            <Button
              variant={`outline-danger${likeStatus === 'Filled' ? ' active' : ''}`}
              size="sm"
              className="m-1"
              onClick={handleLike}
            >
              {likeStatus === 'Filled' ? svg.LikeFilled : svg.LikeNotFilled} {data?.answer?.likes }
            </Button>
            <Button variant={`outline-secondary${dislikeStatus === 'Filled' ? ' active' : ''}`} size="sm" className="m-1" onClick={handleDisLike}>
              {dislikeStatus === 'Filled' ? svg.DislikeFilled : svg.DislikeNotFilled} {data?.answer?.dislikes }
            </Button>
          </div>
          </>
}
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}

export default Questions;
