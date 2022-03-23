import React, { component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-tsparticles';

function App() {
  return (
    <div className="App">
      <Particles className='particles'
         id="tsparticles"
         options={particlesOptions}
       />

      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />

      {/* <FaceRecognition />    } */}
    </div>
  );
}

export default App;





const particlesOptions = 
  {
    fpsLimit: 120,

    particles: {
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 60,
      },
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 300,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 1.5,
        straight: false,
      },

      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
    },
    detectRetina: true,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 150,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 2,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
      },
    },
  }
