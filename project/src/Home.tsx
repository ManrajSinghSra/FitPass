import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { GymFinder } from './components/GymFinder';
import { Subscription } from './components/Subscription';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import axios from "./config/axios.js"
export const Home = ({ onLogin }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async(userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAuthOpen(false);
    onLogin();  

    try {
          axios.post("/register",userData,{ withCredentials: true })
          navigate('/dashboard'); 
      
    } catch (error) {
      console.log(error);
      
    }
    


  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
        onLogout={() => {
          setIsLoggedIn(false);
          setUser(null);
        }}
      />
      <Hero onGetStarted={() => setIsAuthOpen(true)} />
      <Features />
      <GymFinder />
      <Subscription onSubscribe={() => setIsAuthOpen(true)} />
      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuth={handleAuth}
      />
    </div>
  );
};