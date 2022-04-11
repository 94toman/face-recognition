import React from "react";
import Particles from 'react-tsparticles';

const ParticlesSetting = () =>{
     // Settings for the background animation. 
const particlesOptions = 
    {
    fpsLimit: 120,
    particles: {
        number: {
        density: {
            enable: true,
            value_area: 800,
        },
        value: 40,
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
    return (
        <Particles className='particles'         //Background interactive particles
        id="tsparticles"
        options={particlesOptions}
      />
    )
}

export default ParticlesSetting;