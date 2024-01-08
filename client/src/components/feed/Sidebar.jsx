import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Nav, NavDropdown, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
export default function Sidebar() {
  const navigate = useNavigate()
  const onChoose = (choose) => {
    console.log(choose)
    navigate('/feed', { state: choose })
}
    return(
        <Col xs={12} md={2} className="d-none d-md-block">
                <div className='mt-3 p-2' style={{ backgroundColor: '', position: 'fixed' }} >
                  <p style={{ textDecoration: 'none', color: 'white' , cursor:'pointer'}} onClick={() => onChoose('academic')} >Academic</p>
                  <hr style={{ color: 'white' }} />
                  <p style={{ textDecoration: 'none', color: 'white' , cursor:'pointer'}} onClick={() => onChoose('non-academic')} >Non Academic</p>
                  <hr style={{ color: 'white' }} />
                  <p style={{ textDecoration: 'none', color: 'white' , cursor:'pointer'}} onClick={() => onChoose('co-curricular')} >Co-Curricular</p>
                </div>

              </Col>
    ) 
    
}