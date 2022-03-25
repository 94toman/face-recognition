import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-tsparticles';
import Clarifai, { COLOR_MODEL } from 'clarifai';

 //https://github.com/Clarifai/clarifai-javascript
 //https://www.clarifai.com/models/ai-face-detection  - check if it works

const app = new Clarifai.App({
  apiKey: '2b5281ceaf3244f3a406dd6ebc554be7'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: (clarifaiFace.left_col * width),
      topRow: (clarifaiFace.top_row * height),
      rightCol: (width - (clarifaiFace.right_col * width)),
      bottomRow: (height - (clarifaiFace.bottom_row * height))
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
         this.state.input)
         .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
         .catch(err => console.log(err)) 
  }

  onRouteChange = () => {
    this.setState({route: 'home'});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
           id="tsparticles"
           options={particlesOptions}
         />
  
        <Navigation />
        <Logo />
        { this.state.route === 'signin' 
        ? <Signin onRouteChange={this.onRouteChange}/>
        : <div>
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} 
            />
      
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        }
      </div>
    );
  }
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
