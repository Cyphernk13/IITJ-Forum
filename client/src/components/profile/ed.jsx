return (
    isEdit % 2 === 1 ? <Edit email={email} setIsEdit={setIsEdit} /> :
    <>
    <Navbar/>
    <br /><br />
      <div className='flex-wrapper'>
        <section className="profile-page hello" style={{ borderRadius: '0rem', width: '100%', height: '100vh',backgroundColor: '#2b2f31' }}>
          <Row className="justify-content-center align-items-center h-0">
              <Col className="p-0 m-0">
                <Card className="mb-0 gradient-custom " >
                  <Card.Img variant="top" src={profile.bannerPicture} style={{
                    width: '100%',
                    height: '200',
                    objectFit: 'cover',
                  }} />
                  <Row className="g-0"  >
                    <Col md="4" className="gradient-custom text-center text-white"
                      style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                      <img
                        src={profile.profilePicture}
                        className="rounded-circle mt-2 mb-2"
                        style={{ width: "200", height: "200" }}
                        alt="Avatar"
                      />
                      <h5 className="mb-0" >{profile.username}</h5>
                      <p className="mb-1">{profile.program} in  {profile.Branch} {profile.year} year </p>
                      <Link style={{ textDecoration: 'none', hover: 'inherit' }}>
                        {
                          email === "upadhyay.12@iitj.ac.in" ?                         <div onClick={() => setIsEdit(prev => prev + 1)}>
                          <span style={{ color: 'white'}}><BiPencil /> Edit profile</span>
                        </div> : <></>
                        }

                      </Link>
                      <div className="social-icons mt-5">
                        <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">
                          <FaLinkedin className="text-white me-3" />
                        </a>
                        <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                          <FaInstagram className="text-white me-3" />
                        </a>
                        <a href={profile.gitHub} target="_blank" rel="noopener noreferrer">
                          <FaGithub className="text-white" />
                        </a>
                      </div>
                    </Col>
                    <Col md="8">
                      <Card.Body className="p-2" style={{color: 'white'}}>
                        <h6 >Information</h6>
                        <hr className="mt-0 mb-1" style={{color: 'white'}}/>
                        <Row className="pt-1">
                          <Col size="6" className="mb-1">
                            <h6>Email</h6>
                            <p className="text-muted" >{profile.email}</p>
                          </Col>
                          <Col size="6" className="mb-1">
                            <h6>Phone</h6>
                            <p className="text-muted">{profile.phone}</p>
                          </Col>
                        </Row>
                        <Row className="pt-1">
                          <Col size="6" className="mb-1">
                            <h6>Age</h6>
                            <p className="text-muted">{profile.age}</p>
                          </Col>
                          <Col size="6" className="mb-1">
                            <h6>Roll number</h6>
                            <p className="text-muted">{profile.rollNo}</p>
                          </Col>
                        </Row>
                        <Row className="pt-1">
                          <Col size="6" className="mb-1">
                            <h6>Hobbies</h6>
                            <p className="text-muted">{profile.hobbies}</p>
                          </Col>
                        </Row>
                        <Row className="pt-1">
                          <Col size="6" className="mb-1">
                            <h6>Skills</h6>
                            <p className="text-muted">{profile.skills}</p>
                          </Col>
                        </Row>
                        <Row className="pt-1">
                          <Col size="6" className="mb-1">
                            <h6>About me</h6>
                            <p className="text-muted">{profile.aboutMe}</p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Footer/>
        </section>

      </div>
      </>
  );