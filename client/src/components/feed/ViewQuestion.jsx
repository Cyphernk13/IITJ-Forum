import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Nav, NavDropdown, Button, Form } from 'react-bootstrap';
import { BiPencil, BiSearch, BiDislike } from 'react-icons/bi';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BsHeart, BsChat, BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import bg from './../../img/Login/bg-login.jpg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FullQuestion from './Answer';
import './../../css/enter/enter.css'
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import Sidebar from './Sidebar';
const formattedDateTime = (dateTime) => {
  return new Date(dateTime).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
export default function Feed() {
  const location = useLocation();
  const questionID = location.state;
  const [email, setEmail] = useState("")
  const [pfp,setPfp] = useState('')
  const [username,setUsername] = useState('')
  const handleAskQuestionSubmit = async (e) => {
    e.preventDefault()
    const currentTime = new Date();
    const text = e.target.elements.questionTextarea.value;
    if (text === '') return
    try {
      var response = ""
      if (type.type === 'answer') {
        response = await axios.post('http://localhost:5000/feed/answer', {
          answer: text,
          questionID,
          author: email,
          time: currentTime,
          likes: 0,
          dislikes: 0
        })
      } else if (type.type === 'Comment') {
        response = await axios.post('http://localhost:5000/feed/comment', {
          comment: text,
          answerID: type.id,
          author: email,
          time: currentTime,
          likes: 0,
          dislikes: 0
        })
      } else {
        response = await axios.post('http://localhost:5000/feed/reply', {
          reply: text,
          commentID: type.id,
          author: email,
          time: currentTime,
          likes: 0,
          dislikes: 0
        })
      }
    } catch (err) {
      console.log(err)
    }
  };
  const [questions, setQuestions] = React.useState([])
  const [type, setType] = React.useState({ type: 'answer', id: questionID })
  React.useLayoutEffect(() => {
    const storedData = localStorage.getItem('email');
    if (storedData) {
      setEmail(storedData);
    }
    const FetchData = async () => {
      try {
        var response = await axios.post('http://localhost:5000/feed/viewQuestion', { questionID });
        setQuestions(response.data) 
        console.log(response.data)
        response = await axios.post("http://localhost:5000/profile/getUser",{email:response.data.question.author})
        // console.log(response.data,'fgfd')
        // console.log(response)
        setUsername(response.data.username)
        setPfp(response.data.profilePicture)
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    FetchData()
  }, [])
  if (questions.length === 0) {
    return (<div className='loading-page'>
      <div class="center">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>
    </div>)
  }
  else {
    const data = questions.answers.map(question => <FullQuestion data={question} setType={setType} />)
    return (
      <div className="flex-wrapper feed-page">
        <section
          className="profile-page"
          style={{
            borderRadius: '0rem',
            width: '100%',
            height: '900px',
            backgroundColor: '#2b2f31',
            paddingBottom: '16px'
          }}
        >
          <Navbar />
          <Container className="py-5 h-100 mt-3 scrollbarfeed" style={{ overflow: 'auto' }}>
            <Row>
              <Sidebar />
              <Col>
                <Card style={{ backgroundColor: '#1d1f20' , color: '#d7dadc' }}>
                  <Card.Body >
                    <h4>{questions.question.question}</h4>
                    <small className="">
                      {/* User Avatar */}
                      <img
                        src={pfp}
                        alt="User Avatar"
                        className="rounded-circle me-2"
                        style={{ width: '30px', height: '30px' }}
                      />
                      <Link to="/profile" className='text-white-50' style={{ textDecoration: 'none' }}>
                        {username} | {formattedDateTime(questions.question.time)}
                      </Link>
                    </small>
                  </Card.Body>

                </Card>
                <br />
                {data.length !== 0 ? data : <Card style={{backgroundColor: '#1d1f20'}}><Card.Body ><p style={{color: '#d7dadc'}}>Be the first one to answer !</p></Card.Body></Card>}
              </Col>
              <Col className='ms-5'>
                <Card style={{ position: 'fixed', width: '30%', backgroundColor: '#1d1f20' }}>
                  <Card.Body>
                    <Form style={{color:'#d7dadc'}} onSubmit={handleAskQuestionSubmit}>
                      <Form.Group controlId="questionTextarea" style={{ backgroundColor: '#1d1f20' }}>
                        <Form.Label >Your {type.type}:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder={`Type Your ${type.type}`}
                          style={{ backgroundColor: '#1d1f20', color: '#d7dadc' }}
                        />

                      </Form.Group>
                      <Button variant="primary" type="submit" className='mt-2'>                      Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <Footer />
      </div>
    );
  }
}
