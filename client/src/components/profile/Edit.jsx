import React, { useState, useEffect } from 'react';
import Input from './../enter/Input';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import bg from './../../img/Login/bg-login.jpg';
import { Container, Row, Col, Card, Nav, Navbar, NavDropdown, Button, Form } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import axios from 'axios';
const EditProfile = ({ setIsEdit }) => {
  const [username, setUsername] = useState('');
  const [year, setYear] = useState('');
  const [program, setProgram] = useState('')
  const [Branch, setBranch] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [gitHub, setgithub] = useState('');
  const [instagram, setInstagram] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [skills, setSkills] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [bannerPicture, setBannerPicture] = useState('');
  const [bannerCrop, setBannerCrop] = useState({ unit: '%', width: 30, aspect: 3 / 1 });
  const [completedBannerCrop, setCompletedBannerCrop] = useState(null);
  const [email,setEmail] = useState('')

  useEffect(() => {
    const storedData = localStorage.getItem('email');
    if (storedData) {
      setEmail(storedData);
    }
  },[])
  const validateFile = (file, maxSize, allowedFormats) => {
    const fileSize = file.size / 1024 / 1024; // in MB
    const fileType = file.type;

    if (fileSize > maxSize) {
      alert(`File size exceeds ${maxSize}MB limit.`);
      console.log("sjbxjajxhjvhsvhvhvx")
      return false;
    }

    const allowed = allowedFormats.includes(fileType);
    if (!allowed) {
      alert(`Invalid file format. Please choose a ${allowedFormats.join('/')} file.`);
      return false;
    }

    return true;
  };

  const onSelectFile = (e, isBanner) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check if it's a valid file
      if (!validateFile(file, 2, ['image/jpeg', 'image/png'])) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (isBanner) {
          setBannerPicture(reader.result);
        } else {
          setProfilePicture(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropChange = (crop, isBanner) => {
    if (isBanner) {
      setBannerCrop(crop);
    } else {
      setCrop(crop);
    }
  };

  const onCropComplete = (crop, isBanner) => {
    if (isBanner) {
      setCompletedBannerCrop(crop);
    } else {
      setCompletedCrop(crop);
    }
  };

  const handleProgramChange = (e) => {
    setProgram(e.target.value);
  };
  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSave = async () => {
    const bannerData = completedBannerCrop
      ? {
          x: Math.round(completedBannerCrop.x),
          y: Math.round(completedBannerCrop.y),
          width: Math.round(completedBannerCrop.width),
          height: Math.round(completedBannerCrop.height),
        }
      : null;
    const profileData = {
      username,
      year,
      program,
      Branch,
      email,
      phone,
      age,
      skills,
      rollNo,
      hobbies,
      aboutMe,
      linkedIn,
      instagram,
      gitHub,
      profilePicture,
      bannerPicture,
      bannerCrop: bannerData,
    };
    console.log(profileData)
    try{
      const response = await axios.post("http://localhost:5000/profile/update",profileData)
    }catch(err){
        //Handle error
    }
    setIsEdit( prev => prev+1 )
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        height: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      <Container className="w-75 bg-white p-5 pb-0 pt-3 rounded ">

        <h3 className='' style={{}}>Edit your profile</h3>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="formUsername">
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  type="text"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formYear" className='mb-2'>
                <Form.Select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="" disabled>Select Year</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBranch" className='mb-2'>
                <Form.Select value={program} onChange={handleProgramChange}>
                  <option value="" disabled>Select Program</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="Ph.D">Ph.D</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formProgram" className='mb-2'>
                <Form.Select value={Branch} onChange={handleBranchChange}>
                  <option value="" disabled>Select Branch</option>
                  <option value="CS">CS</option>
                  <option value="AI">AI</option>
                  <option value="EE">EE</option>
                  <option value="ME">ME</option>
                  <option value="CH">CH</option>
                  <option value="CI">CI</option>
                  <option value="MT">MT</option>
                  <option value="BB">BB</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Form.Group controlId="formPhone">
              <Input
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                type="tel"
              />
            </Form.Group>
          </Row>
          <Row>
            <Col>
            <Form.Group controlId="formAge">
              <Input
                label="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                type="number"
              />
            </Form.Group>
            </Col>
            <Col>

            <Form.Group controlId="formRollNo">
              <Input
                label="Roll No"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter your roll number"
                type="text"
              />
            </Form.Group>
            </Col>
            <Form.Group controlId="formHobbies">
              <Input
                label="Hobbies"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
                placeholder="Enter your hobbies"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="formSkills">
              <Input
                label="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Enter your skills"
                type="text"
              />
            </Form.Group>

            <Form.Group controlId="formAboutMe">
              <Input
                label="About Me"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="Tell us about yourself"
                type="text"
              />
            </Form.Group>
          </Row>
          <Row>
            <Col><Form.Group controlId="formLinkedIn">
              <Input
                label="LinkedIn profile"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                placeholder="Enter your LinkedIn profile"
                type="text"
              />
            </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formInstagram">
                <Input
                  label="Instagram profile "
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="Enter your Instagram profile"
                  type="text"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGithub">
                <Input
                  label="GitHub profile"
                  value={gitHub}
                  onChange={(e) => setgithub(e.target.value)}
                  placeholder="Enter your GitHub profile"
                  type="text"
                />
              </Form.Group></Col>

            <Row>
              <Col>
            <Form.Group controlId="formProfilePicture" className='mb-2'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={onSelectFile} />
              {profilePicture && (
                <ReactCrop
                  src={profilePicture}
                  crop={crop}
                  onChange={onCropChange}
                  onComplete={onCropComplete}
                />
              )}
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="formBannerPicture" className='mb-2'>
                <Form.Label>Banner Image</Form.Label>
                <Form.Control type="file" onChange={(e) => onSelectFile(e, true)} />
                {bannerPicture && (
                  <ReactCrop
                    src={bannerPicture}
                    crop={bannerCrop}
                    onChange={(crop) => onCropChange(crop, true)}
                    onComplete={(crop) => onCropComplete(crop, true)}
                  />
                )}
              </Form.Group>
            </Col>
            </Row>
            <Button variant="primary" className='save-btn' onClick={handleSave}>
              Save
            </Button>
          </Row>
        </Form>



      </Container>
    </div>

  );
};

export default EditProfile;
