import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Info from './components/Info/Info';
import ParticlesSetting from './components/ParticlesSetting/ParticlesSetting';

const defaultState = {    // for creating and reseting STATE
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

class App extends Component {
  constructor(){
    super();
    this.state = defaultState;
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
    this.setState({imageUrl: this.state.input});
    fetch(`https://face-recognition-94toman.herokuapp.com/imageurl`, {  // Using Server side to increment user's Entry count in DB
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(res => res.json())
      .then(response => {
      if (response) {
        fetch(`https://face-recognition-94toman.herokuapp.com/image`, {  // Using Server side to increment user's Entry count in DB
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
      this.setState(defaultState)   // sign out will clear the state
    } else if (route ==='home') {
      this.setState({ isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    const { isSignedIn, imageUrl, route, box} = this.state; 
    return (
      <div className="App">
        <ParticlesSetting />
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
          ? <div>
              <Info />
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            </div>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )        
        }
      </div>
    );
  }
}

export default App;
