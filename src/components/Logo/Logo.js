import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import face from './face-recognition.png'

const Logo = () =>{
    // Logo with tilt animation following user's mouse
    return (
        <div className="ma4 mt0 w4">
            <Tilt className="Tilt br2 shadow-2" tiltMaxAngleX={50} tiltMaxAngleY={50}>
                <div className="pa3">
                    <img src={face} alt='logo'/>
                </div>                    
            </Tilt>
        </div>
       
    )
}

export default Logo;