import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ( {box, imageUrl} ) =>{
    // Image with a box around a face
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img alt='' id='inputimage' src={imageUrl} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>            
        </div>
    )
}

export default FaceRecognition;