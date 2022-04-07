import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) =>{
    // URL input box and a Detect button
    return (
        <div>
            <p className='f3'>
                {'This awesome app will detect a face in a picture. Give it a try.'}
            </p>
            <div className='center'>
                <div className="form center pa4 br3 shadow-5">
                    <input className='f4 pa2 w-70' type='text' placeholder='Insert the URL of the picture' onChange={ onInputChange } />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-red' 
                        onClick={ onPictureSubmit }
                    >Detect</button>
                </div>                
            </div>
        </div>
    )
}

export default ImageLinkForm;