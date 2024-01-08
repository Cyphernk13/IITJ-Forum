import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';
import './success.css';

const AuthenticationSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const animateAndRedirect = async () => {
      // Trigger animation using anime.js
      const logoTimeline = anime.timeline({
        autoplay: true,
        direction: 'alternate',
        loop: true,
      });

      logoTimeline
        .add({
          targets: '.checkmark',
          scale: [{ value: [0, 1], duration: 600, easing: 'easeOutQuad' }],
        })
        .add({
          targets: '.check',
          strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: 700,
            delay: 200,
            easing: 'easeOutQuart',
          },
          translateX: {
            value: [6, 0],
            duration: 700,
            delay: 200,
            easing: 'easeOutQuart',
          },
          translateY: {
            value: [-2, 0],
            duration: 700,
            delay: 200,
            easing: 'easeOutQuart',
          },
          offset: 0,
        });

      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Redirect to /choice
      navigate('/choice');
    };

    animateAndRedirect();
  }, [navigate]);

  useEffect(() => {
    // Set background to black
    document.body.classList.add('dark-mode');

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove('dark-mode');
    };
  }, []);

  return (
    <div className="flex-wrapper feed-page">
      <svg
        className="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="300"
        viewBox="0 0 32 32"
      >
        <circle className="circle" cx="16" cy="16" r="16" fill="#0c3" />
        <path
          className="check"
          d="M9 16l5 5 9-9"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="auth-success-message">Authentication successful. Redirecting...</p>
    </div>
  );
};

export default AuthenticationSuccessPage;
