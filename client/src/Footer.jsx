import React, { useEffect, useState } from 'react';
// import './../../css/enter/enter.css'
// import './feed.css'
// import Footer from '../../footer';
export default function NavBar(){
    return (
        <footer className="bg-dark text-center text-white">
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © {new Date().getFullYear()} Copyright:
          <a className="text-white copyright-link" href="https://iitj.ac.in/">
            IIT Jodhpur
          </a>
        </div>
      </footer>
    )
}