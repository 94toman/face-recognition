import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-tsparticles';
import Clarifai from 'clarifai';

 //https://github.com/Clarifai/clarifai-javascript
 //https://www.clarifai.com/models/ai-face-detection  - check if it works

const app = new Clarifai.App({
  apiKey: '2b5281ceaf3244f3a406dd6ebc554be7'   // https://docs.clarifai.com/
 });

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

class App extends Component {
  constructor(){
    super();
    this.state = {       // creating STATE
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',        
        entries: 0,
        joined: ''
      }
    }
  }

  // Set current user to STATE after signin or registration
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      }
    })
  }

  // Calculates CSS coordinates of the box on a face
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

  // Sets the box coordinations into STATE
  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  // Storing entered URL into STATE
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  // User presses Detect -> Use API to get Face coordinates, increment user's Entry count
  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
         this.state.input)
         .then(response => {
          if (response) {
            fetch('http://localhost:3001/image', {  // Using Server side to increment user's Entry count in DB
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))  // Updates the Entry count on the screen
            })
            .catch(console.log)
          }
           this.displayFaceBox(this.calculateFaceLocation(response))
        })
         .catch(err => console.log(err)) 
  }

  // Navigation handling
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false})
    } else if (route ==='home') {
      this.setState({ isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    const { isSignedIn, imageUrl, route, box} = this.state; 
    return (
      <div className="App">
        <Particles className='particles'         //Background interactive particles
           id="tsparticles"
           options={particlesOptions}
         />
  
        <Navigation isSignedIn={ isSignedIn } onRouteChange={this.onRouteChange}/>
        <Logo />
        { route === 'home'           // if statement for Signin / Home
        ? <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPictureSubmit={this.onPictureSubmit} 
            />      
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (
          (route === 'signin' || route === 'signout')
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )        
        }
      </div>
    );
  }
}

export default App;
