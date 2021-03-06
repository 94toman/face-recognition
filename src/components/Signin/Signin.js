import React from "react";

class Signin extends React.Component {
    constructor(props){
        super();
        this.state = {   // SATE for storing credentials
            signInEmail: '',
            signInPassword: ''
        }
    }

    // Set content of Email field into STATE
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    // Set content of Password field into STATE
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    // Send credentials to server, load user and display home page
    onSubmitSignin = () => {
        fetch('https://face-recognition-94toman.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
        })
        // For future development -> Display an error message to user
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-150 w-50-m w-25-l mw10 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange} 
                                    />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange} 
                                    />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                                onClick={this.onSubmitSignin}
                            />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} 
                            className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;